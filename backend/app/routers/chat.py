from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator
from anthropic import Anthropic, APIError

import os
import json

router = APIRouter(prefix="/api/chat", tags=["chat"])

_api_key = os.getenv("ANTHROPIC_API_KEY")
client = Anthropic(api_key=_api_key) if _api_key else None

SYSTEM_PROMPT = """You are a friendly legal assistant helping a user create a Mutual Non-Disclosure Agreement (NDA). Your job is to have a natural conversation to collect the following information:

1. Disclosing Party Name - the full legal name of the disclosing party
2. Disclosing Party Address - their full address
3. Receiving Party Name - the full legal name of the receiving party
4. Receiving Party Address - their full address
5. Effective Date - when the NDA takes effect (format: YYYY-MM-DD)
6. Confidentiality Period - how many years the NDA lasts (a number)
7. Governing Law State - which state/jurisdiction governs the agreement

Guidelines:
- Be conversational and helpful. Ask for information naturally, not like a form.
- You can ask about multiple related fields at once (e.g., both party names together).
- When the user provides information, acknowledge it and move to the next missing fields.
- If information is ambiguous, ask for clarification.
- When all fields are collected, let the user know the NDA is ready for review and download.
- Keep responses concise - 2-3 sentences is ideal.

Start by warmly greeting the user and asking about the parties involved in the NDA."""

NDA_FIELDS_TOOL = {
    "name": "update_nda_fields",
    "description": "Extract and update NDA document fields from the conversation. Call this whenever the user provides information that maps to any NDA field. Only include fields that have been explicitly provided or can be clearly inferred from the user's message.",
    "input_schema": {
        "type": "object",
        "properties": {
            "disclosing_party_name": {
                "type": "string",
                "description": "Full legal name of the disclosing party",
            },
            "disclosing_party_address": {
                "type": "string",
                "description": "Full address of the disclosing party",
            },
            "receiving_party_name": {
                "type": "string",
                "description": "Full legal name of the receiving party",
            },
            "receiving_party_address": {
                "type": "string",
                "description": "Full address of the receiving party",
            },
            "effective_date": {
                "type": "string",
                "description": "Effective date in YYYY-MM-DD format",
            },
            "confidentiality_period": {
                "type": "string",
                "description": "Number of years as a string (e.g. '2')",
            },
            "governing_law_state": {
                "type": "string",
                "description": "State or jurisdiction for governing law",
            },
        },
        "required": [],
    },
}


class ChatMessage(BaseModel):
    role: str
    content: str

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: str) -> str:
        if v not in ("user", "assistant"):
            raise ValueError("role must be 'user' or 'assistant'")
        return v

    @field_validator("content")
    @classmethod
    def validate_content(cls, v: str) -> str:
        if len(v) > 4000:
            raise ValueError("message content too long")
        return v


class ChatRequest(BaseModel):
    messages: list[ChatMessage]

    @field_validator("messages")
    @classmethod
    def validate_messages(cls, v):
        if len(v) > 100:
            raise ValueError("too many messages")
        return v


class ChatResponse(BaseModel):
    reply: str
    extracted_fields: dict[str, str]


def _serialize_content(content) -> list[dict]:
    """Convert Anthropic SDK content blocks to plain dicts for re-sending."""
    result = []
    for block in content:
        if block.type == "text":
            result.append({"type": "text", "text": block.text})
        elif block.type == "tool_use":
            result.append(
                {"type": "tool_use", "id": block.id, "name": block.name, "input": block.input}
            )
    return result


@router.post("/", response_model=ChatResponse)
def chat(req: ChatRequest):
    if not client:
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY not configured")

    api_messages = [{"role": m.role, "content": m.content} for m in req.messages]

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            tools=[NDA_FIELDS_TOOL],
            messages=api_messages,
        )
    except APIError as e:
        raise HTTPException(status_code=502, detail=f"AI service error: {e.message}")

    reply_text = ""
    extracted_fields: dict[str, str] = {}
    tool_use_id: str | None = None

    for block in response.content:
        if block.type == "text":
            reply_text += block.text
        elif block.type == "tool_use" and block.name == "update_nda_fields":
            extracted_fields.update({k: v for k, v in block.input.items() if v})
            tool_use_id = block.id

    if extracted_fields and not reply_text and tool_use_id:
        try:
            follow_up = client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1024,
                system=SYSTEM_PROMPT,
                tools=[NDA_FIELDS_TOOL],
                messages=api_messages
                + [
                    {"role": "assistant", "content": _serialize_content(response.content)},
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "tool_result",
                                "tool_use_id": tool_use_id,
                                "content": json.dumps(
                                    {"status": "ok", "updated_fields": extracted_fields}
                                ),
                            }
                        ],
                    },
                ],
            )
        except APIError as e:
            raise HTTPException(status_code=502, detail=f"AI service error: {e.message}")

        for block in follow_up.content:
            if block.type == "text":
                reply_text += block.text
            elif block.type == "tool_use" and block.name == "update_nda_fields":
                extracted_fields.update({k: v for k, v in block.input.items() if v})

    if not reply_text:
        reply_text = "I'm sorry, I didn't quite catch that. Could you tell me more about the parties involved in the NDA?"

    return ChatResponse(reply=reply_text, extracted_fields=extracted_fields)
