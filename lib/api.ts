const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(
  endpoint: string,
  method: string,
  body?: any
) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return response.json();
}

export function submitContact(formData: any) {
  return apiRequest("/api/contact", "POST", formData);
}

export function subscribeNewsletter(email: string) {
  return apiRequest("/api/newsletter/subscribe", "POST", {
    email,
  });
}