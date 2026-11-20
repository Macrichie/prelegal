TEMPLATES = [
    {
        "id": "nda",
        "name": "Non-Disclosure Agreement",
        "category": "agreement",
        "description": "A standard non-disclosure agreement to protect confidential information shared between parties.",
    },
    {
        "id": "employment-contract",
        "name": "Employment Contract",
        "category": "contract",
        "description": "A standard employment contract outlining the terms and conditions of employment between an employer and employee.",
    },
    {
        "id": "service-agreement",
        "name": "Service Agreement",
        "category": "agreement",
        "description": "A general service agreement for engaging a service provider to perform specified services.",
    },
    {
        "id": "independent-contractor",
        "name": "Independent Contractor Agreement",
        "category": "agreement",
        "description": "An agreement for hiring an independent contractor, clearly defining the contractor relationship and scope of work.",
    },
    {
        "id": "terms-of-service",
        "name": "Terms of Service",
        "category": "policy",
        "description": "Standard terms of service for a website or application, defining the rules and guidelines for users.",
    },
    {
        "id": "privacy-policy",
        "name": "Privacy Policy",
        "category": "policy",
        "description": "A comprehensive privacy policy template for websites and applications, addressing data collection, use, and protection.",
    },
    {
        "id": "lease-agreement",
        "name": "Residential Lease Agreement",
        "category": "agreement",
        "description": "A standard residential lease agreement between a landlord and tenant for rental property.",
    },
    {
        "id": "power-of-attorney",
        "name": "Power of Attorney",
        "category": "legal-form",
        "description": "A general power of attorney authorizing an agent to act on behalf of the principal in legal and financial matters.",
    },
    {
        "id": "cease-and-desist",
        "name": "Cease and Desist Letter",
        "category": "letter",
        "description": "A formal cease and desist letter demanding that a party stop a specified activity that infringes on rights or violates an agreement.",
    },
    {
        "id": "letter-of-intent",
        "name": "Letter of Intent",
        "category": "letter",
        "description": "A letter of intent expressing the preliminary commitment of parties to enter into a future agreement or transaction.",
    },
]


def get_all_templates():
    return TEMPLATES


def get_template_by_id(template_id: str):
    for t in TEMPLATES:
        if t["id"] == template_id:
            return t
    return None
