const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface ApiTemplateSummary {
  id: string;
  name: string;
  category: string;
  description: string;
}

export async function loginUser(
  name: string,
  email: string
): Promise<ApiUser> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function getUser(userId: number): Promise<ApiUser> {
  const res = await fetch(`${API_BASE}/api/auth/me/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function getTemplates(): Promise<ApiTemplateSummary[]> {
  const res = await fetch(`${API_BASE}/api/templates/`);
  if (!res.ok) throw new Error("Failed to fetch templates");
  return res.json();
}

export async function getHealthCheck(): Promise<{ status: string }> {
  const res = await fetch(`${API_BASE}/api/health`);
  if (!res.ok) throw new Error("Health check failed");
  return res.json();
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  reply: string;
  extracted_fields: Record<string, string>;
}

export async function sendChatMessage(
  templateId: string,
  messages: ChatMessage[]
): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ template_id: templateId, messages }),
  });
  if (!res.ok) throw new Error("Chat request failed");
  return res.json();
}
