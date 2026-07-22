const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(
  endpoint: string,
  method: string,
  body?: unknown
) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data;
console.log("API URL:", API_URL);
  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response from server.");
  }

  if (!response.ok) {
    throw new Error(data?.message || "Request failed.");
  }

  return data;
}

export function submitContact(formData: unknown) {
  return apiRequest("/api/contact", "POST", formData);
}

export function subscribeNewsletter(email: string) {
  return apiRequest("/api/newsletter/subscribe", "POST", {
    email,
  });
}