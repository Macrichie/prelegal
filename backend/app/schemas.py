from datetime import datetime

from pydantic import BaseModel


class LoginRequest(BaseModel):
    name: str
    email: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}


class TemplateVariable(BaseModel):
    name: str
    label: str
    type: str
    required: bool
    placeholder: str | None = None
    options: list[str] | None = None
    defaultValue: str | None = None


class TemplateSection(BaseModel):
    id: str
    title: str
    content: str
    order: int


class TemplateResponse(BaseModel):
    id: str
    name: str
    category: str
    description: str
    variables: list[TemplateVariable]
    sections: list[TemplateSection]
    createdAt: str
    updatedAt: str
    version: str


class TemplateSummary(BaseModel):
    id: str
    name: str
    category: str
    description: str
