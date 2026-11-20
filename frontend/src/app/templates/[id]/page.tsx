import TemplatePageClient from "./TemplatePageClient";

export const dynamic = "force-dynamic";

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TemplatePageClient templateId={id} />;
}
