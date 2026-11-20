from fastapi import APIRouter, HTTPException

from ..data.templates import get_all_templates, get_template_by_id
from ..schemas import TemplateSummary

router = APIRouter(prefix="/api/templates", tags=["templates"])


@router.get("/", response_model=list[TemplateSummary])
def list_templates():
    return get_all_templates()


@router.get("/{template_id}", response_model=TemplateSummary)
def get_template(template_id: str):
    template = get_template_by_id(template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template
