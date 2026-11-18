export type {
  Template,
  TemplateSection,
  TemplateVariable,
} from "../../types/template";

export { nda } from "./nda";
export { employmentContract } from "./employment-contract";
export { serviceAgreement } from "./service-agreement";
export { independentContractor } from "./independent-contractor";
export { termsOfService } from "./terms-of-service";
export { privacyPolicy } from "./privacy-policy";
export { leaseAgreement } from "./lease-agreement";
export { powerOfAttorney } from "./power-of-attorney";
export { ceaseAndDesist } from "./cease-and-desist";
export { letterOfIntent } from "./letter-of-intent";

import { Template } from "../../types/template";
import { nda } from "./nda";
import { employmentContract } from "./employment-contract";
import { serviceAgreement } from "./service-agreement";
import { independentContractor } from "./independent-contractor";
import { termsOfService } from "./terms-of-service";
import { privacyPolicy } from "./privacy-policy";
import { leaseAgreement } from "./lease-agreement";
import { powerOfAttorney } from "./power-of-attorney";
import { ceaseAndDesist } from "./cease-and-desist";
import { letterOfIntent } from "./letter-of-intent";

export const templates: Template[] = [
  nda,
  employmentContract,
  serviceAgreement,
  independentContractor,
  termsOfService,
  privacyPolicy,
  leaseAgreement,
  powerOfAttorney,
  ceaseAndDesist,
  letterOfIntent,
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(
  category: Template["category"]
): Template[] {
  return templates.filter((t) => t.category === category);
}
