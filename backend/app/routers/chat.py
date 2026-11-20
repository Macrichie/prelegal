from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator
from anthropic import Anthropic, APIError

import os
import json
from pathlib import Path

router = APIRouter(prefix="/api/chat", tags=["chat"])


def _load_api_key() -> str:
    """Load API key from env var, falling back to .env file."""
    key = os.getenv("ANTHROPIC_API_KEY", "").strip()
    if key:
        return key
    env_file = Path(__file__).resolve().parents[3] / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            if line.startswith("ANTHROPIC_API_KEY="):
                return line.split("=", 1)[1].strip()
    return ""


_api_key = _load_api_key()
client = Anthropic(api_key=_api_key) if _api_key else None

# --- Template definitions (mirror of the TypeScript templates) ---
# Each entry maps template_id -> { name, description, variables: [{name, label, type, required}] }

TEMPLATE_REGISTRY: dict[str, dict] = {
    "nda": {
        "name": "Non-Disclosure Agreement",
        "variables": [
            {"name": "disclosing_party_name", "label": "Disclosing Party Name", "description": "Full legal name of the disclosing party"},
            {"name": "disclosing_party_address", "label": "Disclosing Party Address", "description": "Full address of the disclosing party"},
            {"name": "receiving_party_name", "label": "Receiving Party Name", "description": "Full legal name of the receiving party"},
            {"name": "receiving_party_address", "label": "Receiving Party Address", "description": "Full address of the receiving party"},
            {"name": "effective_date", "label": "Effective Date", "description": "Effective date in YYYY-MM-DD format"},
            {"name": "confidentiality_period", "label": "Confidentiality Period", "description": "Number of years as a string (e.g. '2')"},
            {"name": "governing_law_state", "label": "Governing Law State", "description": "State or jurisdiction for governing law"},
        ],
    },
    "employment-contract": {
        "name": "Employment Contract",
        "variables": [
            {"name": "employer_name", "label": "Employer Name", "description": "Full legal name of the employer/company"},
            {"name": "employer_address", "label": "Employer Address", "description": "Full address of the employer"},
            {"name": "employee_name", "label": "Employee Name", "description": "Full legal name of the employee"},
            {"name": "employee_address", "label": "Employee Address", "description": "Full address of the employee"},
            {"name": "job_title", "label": "Job Title", "description": "Title/position of the employee"},
            {"name": "start_date", "label": "Start Date", "description": "Employment start date in YYYY-MM-DD format"},
            {"name": "salary", "label": "Salary", "description": "Annual salary amount (e.g. '$75,000')"},
            {"name": "pay_frequency", "label": "Pay Frequency", "description": "How often the employee is paid (e.g. 'bi-weekly', 'monthly')"},
            {"name": "work_hours", "label": "Work Hours", "description": "Expected weekly work hours (e.g. '40')"},
            {"name": "vacation_days", "label": "Vacation Days", "description": "Number of vacation days per year"},
            {"name": "probation_period", "label": "Probation Period", "description": "Length of probation period (e.g. '90 days')"},
            {"name": "notice_period", "label": "Notice Period", "description": "Required notice period for termination (e.g. '2 weeks')"},
            {"name": "governing_law_state", "label": "Governing Law State", "description": "State or jurisdiction for governing law"},
        ],
    },
    "service-agreement": {
        "name": "Service Agreement",
        "variables": [
            {"name": "provider_name", "label": "Service Provider Name", "description": "Full legal name of the service provider"},
            {"name": "provider_address", "label": "Provider Address", "description": "Full address of the service provider"},
            {"name": "client_name", "label": "Client Name", "description": "Full legal name of the client"},
            {"name": "client_address", "label": "Client Address", "description": "Full address of the client"},
            {"name": "service_description", "label": "Service Description", "description": "Description of services to be provided"},
            {"name": "compensation", "label": "Compensation", "description": "Payment amount and terms (e.g. '$5,000 per month')"},
            {"name": "start_date", "label": "Start Date", "description": "Agreement start date in YYYY-MM-DD format"},
            {"name": "end_date", "label": "End Date", "description": "Agreement end date in YYYY-MM-DD format"},
            {"name": "payment_terms", "label": "Payment Terms", "description": "Payment schedule (e.g. 'Net 30')"},
            {"name": "governing_law_state", "label": "Governing Law State", "description": "State or jurisdiction for governing law"},
        ],
    },
    "independent-contractor": {
        "name": "Independent Contractor Agreement",
        "variables": [
            {"name": "company_name", "label": "Company Name", "description": "Full legal name of the hiring company"},
            {"name": "company_address", "label": "Company Address", "description": "Full address of the company"},
            {"name": "contractor_name", "label": "Contractor Name", "description": "Full legal name of the contractor"},
            {"name": "contractor_address", "label": "Contractor Address", "description": "Full address of the contractor"},
            {"name": "scope_of_work", "label": "Scope of Work", "description": "Description of work to be performed"},
            {"name": "compensation", "label": "Compensation", "description": "Payment amount and structure"},
            {"name": "start_date", "label": "Start Date", "description": "Contract start date in YYYY-MM-DD format"},
            {"name": "end_date", "label": "End Date", "description": "Contract end date in YYYY-MM-DD format"},
            {"name": "payment_terms", "label": "Payment Terms", "description": "Payment schedule and method"},
            {"name": "governing_law_state", "label": "Governing Law State", "description": "State or jurisdiction for governing law"},
        ],
    },
    "terms-of-service": {
        "name": "Terms of Service",
        "variables": [
            {"name": "company_name", "label": "Company Name", "description": "Full legal name of the company"},
            {"name": "website_url", "label": "Website URL", "description": "URL of the website or service"},
            {"name": "effective_date", "label": "Effective Date", "description": "Date the terms take effect in YYYY-MM-DD format"},
            {"name": "contact_email", "label": "Contact Email", "description": "Contact email address for legal inquiries"},
            {"name": "governing_law_state", "label": "Governing Law State", "description": "State or jurisdiction for governing law"},
            {"name": "minimum_age", "label": "Minimum Age", "description": "Minimum age to use the service (e.g. '13')"},
            {"name": "arbitration_body", "label": "Arbitration Body", "description": "Arbitration organization for disputes (e.g. 'American Arbitration Association')"},
        ],
    },
    "privacy-policy": {
        "name": "Privacy Policy",
        "variables": [
            {"name": "company_name", "label": "Company Name", "description": "Full legal name of the company"},
            {"name": "website_url", "label": "Website URL", "description": "URL of the website or service"},
            {"name": "effective_date", "label": "Effective Date", "description": "Date the policy takes effect in YYYY-MM-DD format"},
            {"name": "contact_email", "label": "Contact Email", "description": "Contact email for privacy inquiries"},
            {"name": "data_retention_period", "label": "Data Retention Period", "description": "How long user data is retained (e.g. '2 years')"},
            {"name": "dpo_name", "label": "Data Protection Officer", "description": "Name of the data protection officer"},
            {"name": "governing_law_state", "label": "Governing Law State", "description": "State or jurisdiction for governing law"},
        ],
    },
    "lease-agreement": {
        "name": "Residential Lease Agreement",
        "variables": [
            {"name": "landlord_name", "label": "Landlord Name", "description": "Full legal name of the landlord"},
            {"name": "landlord_address", "label": "Landlord Address", "description": "Full address of the landlord"},
            {"name": "tenant_name", "label": "Tenant Name", "description": "Full legal name of the tenant"},
            {"name": "tenant_address", "label": "Tenant Current Address", "description": "Current address of the tenant"},
            {"name": "property_address", "label": "Property Address", "description": "Full address of the rental property"},
            {"name": "monthly_rent", "label": "Monthly Rent", "description": "Monthly rent amount (e.g. '$1,500')"},
            {"name": "security_deposit", "label": "Security Deposit", "description": "Security deposit amount"},
            {"name": "lease_start_date", "label": "Lease Start Date", "description": "Lease start date in YYYY-MM-DD format"},
            {"name": "lease_end_date", "label": "Lease End Date", "description": "Lease end date in YYYY-MM-DD format"},
            {"name": "rent_due_day", "label": "Rent Due Day", "description": "Day of month rent is due (e.g. '1st')"},
            {"name": "late_fee", "label": "Late Fee", "description": "Late payment fee amount"},
            {"name": "governing_law_state", "label": "Governing Law State", "description": "State or jurisdiction for governing law"},
        ],
    },
    "power-of-attorney": {
        "name": "Power of Attorney",
        "variables": [
            {"name": "principal_name", "label": "Principal Name", "description": "Full legal name of the principal (person granting power)"},
            {"name": "principal_address", "label": "Principal Address", "description": "Full address of the principal"},
            {"name": "agent_name", "label": "Agent Name", "description": "Full legal name of the agent (person receiving power)"},
            {"name": "agent_address", "label": "Agent Address", "description": "Full address of the agent"},
            {"name": "powers_granted", "label": "Powers Granted", "description": "Specific powers being granted to the agent"},
            {"name": "effective_date", "label": "Effective Date", "description": "Date the power of attorney takes effect in YYYY-MM-DD format"},
            {"name": "expiration_date", "label": "Expiration Date", "description": "Date the power of attorney expires in YYYY-MM-DD format"},
            {"name": "governing_law_state", "label": "Governing Law State", "description": "State or jurisdiction for governing law"},
        ],
    },
    "cease-and-desist": {
        "name": "Cease and Desist Letter",
        "variables": [
            {"name": "sender_name", "label": "Sender Name", "description": "Full legal name of the person sending the letter"},
            {"name": "sender_address", "label": "Sender Address", "description": "Full address of the sender"},
            {"name": "recipient_name", "label": "Recipient Name", "description": "Full legal name of the recipient"},
            {"name": "recipient_address", "label": "Recipient Address", "description": "Full address of the recipient"},
            {"name": "violation_description", "label": "Violation Description", "description": "Description of the infringing or harmful activity"},
            {"name": "demand_action", "label": "Demanded Action", "description": "Specific action demanded (e.g. 'cease all use of the trademark')"},
            {"name": "compliance_deadline", "label": "Compliance Deadline", "description": "Deadline for compliance in YYYY-MM-DD format"},
            {"name": "governing_law_state", "label": "Governing Law State", "description": "State or jurisdiction for governing law"},
        ],
    },
    "letter-of-intent": {
        "name": "Letter of Intent",
        "variables": [
            {"name": "sender_name", "label": "Sender Name", "description": "Full legal name of the sender"},
            {"name": "sender_address", "label": "Sender Address", "description": "Full address of the sender"},
            {"name": "recipient_name", "label": "Recipient Name", "description": "Full legal name of the recipient"},
            {"name": "recipient_address", "label": "Recipient Address", "description": "Full address of the recipient"},
            {"name": "transaction_description", "label": "Transaction Description", "description": "Description of the proposed transaction or deal"},
            {"name": "proposed_terms", "label": "Proposed Terms", "description": "Key terms of the proposed agreement"},
            {"name": "purchase_price", "label": "Purchase Price", "description": "Proposed purchase price or consideration"},
            {"name": "due_diligence_period", "label": "Due Diligence Period", "description": "Length of due diligence period (e.g. '30 days')"},
            {"name": "target_closing_date", "label": "Target Closing Date", "description": "Target date for closing in YYYY-MM-DD format"},
            {"name": "expiration_date", "label": "Expiration Date", "description": "Date the letter of intent expires in YYYY-MM-DD format"},
            {"name": "governing_law_state", "label": "Governing Law State", "description": "State or jurisdiction for governing law"},
        ],
    },
}

AVAILABLE_TEMPLATES_LIST = ", ".join(
    f"{t['name']} ({tid})" for tid, t in TEMPLATE_REGISTRY.items()
)


def _build_system_prompt(template_id: str) -> str:
    tmpl = TEMPLATE_REGISTRY[template_id]
    field_lines = "\n".join(
        f"  {i+1}. {v['label']} - {v['description']}"
        for i, v in enumerate(tmpl["variables"])
    )
    return f"""You are a friendly legal assistant helping a user create a {tmpl['name']}. Your job is to have a natural conversation to collect the following information:

{field_lines}

Guidelines:
- Be conversational and helpful. Ask for information naturally, not like a form.
- You can ask about multiple related fields at once (e.g., both party names together).
- When the user provides information, acknowledge it and move to the next missing fields.
- If information is ambiguous, ask for clarification.
- When all fields are collected, let the user know the document is ready for review and download.
- Keep responses concise - 2-3 sentences is ideal.
- If the user asks about a different document type, let them know the available templates are: {AVAILABLE_TEMPLATES_LIST}. Suggest they go back to the dashboard to choose a different template.

Start by warmly greeting the user and asking about the first relevant details for this {tmpl['name']}."""


def _build_tool_schema(template_id: str) -> dict:
    tmpl = TEMPLATE_REGISTRY[template_id]
    properties = {}
    for v in tmpl["variables"]:
        properties[v["name"]] = {
            "type": "string",
            "description": v["description"],
        }
    return {
        "name": "update_document_fields",
        "description": f"Extract and update {tmpl['name']} fields from the conversation. Call this whenever the user provides information that maps to any document field. Only include fields that have been explicitly provided or can be clearly inferred from the user's message.",
        "input_schema": {
            "type": "object",
            "properties": properties,
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
    template_id: str
    messages: list[ChatMessage]

    @field_validator("template_id")
    @classmethod
    def validate_template_id(cls, v: str) -> str:
        if v not in TEMPLATE_REGISTRY:
            raise ValueError(f"Unknown template: {v}")
        return v

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

    system_prompt = _build_system_prompt(req.template_id)
    tool_schema = _build_tool_schema(req.template_id)
    api_messages = [{"role": m.role, "content": m.content} for m in req.messages]

    try:
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            system=system_prompt,
            tools=[tool_schema],
            messages=api_messages,
        )
    except APIError as e:
        print(f"[CHAT] Anthropic API error: {type(e).__name__}: {e}")
        raise HTTPException(status_code=502, detail=f"AI service error: {e.message}")
    except Exception as e:
        print(f"[CHAT] Unexpected error: {type(e).__name__}: {e}")
        raise HTTPException(status_code=502, detail=f"AI service error: {str(e)}")

    reply_text = ""
    extracted_fields: dict[str, str] = {}
    tool_use_id: str | None = None

    for block in response.content:
        if block.type == "text":
            reply_text += block.text
        elif block.type == "tool_use" and block.name == "update_document_fields":
            extracted_fields.update({k: v for k, v in block.input.items() if v})
            tool_use_id = block.id

    if extracted_fields and not reply_text and tool_use_id:
        try:
            follow_up = client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=1024,
                system=system_prompt,
                tools=[tool_schema],
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
            elif block.type == "tool_use" and block.name == "update_document_fields":
                extracted_fields.update({k: v for k, v in block.input.items() if v})

    if not reply_text:
        tmpl_name = TEMPLATE_REGISTRY[req.template_id]["name"]
        reply_text = f"I'm sorry, I didn't quite catch that. Could you tell me more about the details for your {tmpl_name}?"

    return ChatResponse(reply=reply_text, extracted_fields=extracted_fields)
