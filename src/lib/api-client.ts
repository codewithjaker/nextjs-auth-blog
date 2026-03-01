// lib/api-client.ts
const API_BASE = "/api";

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Request failed");
  }
  return res.json();
}

export const api = {
  // Users
  getUsers: (params?: any) => fetchAPI(`/users?${new URLSearchParams(params)}`),
  getUser: (id: string) => fetchAPI(`/users/${id}`),
  createUser: (data: any) =>
    fetchAPI("/users", { method: "POST", body: JSON.stringify(data) }),
  updateUser: (id: string, data: any) =>
    fetchAPI(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteUser: (id: string) => fetchAPI(`/users/${id}`, { method: "DELETE" }),

  // Posts (similar pattern)
  getPosts: (params?: any) => fetchAPI(`/posts?${new URLSearchParams(params)}`),
  getPost: (id: string) => fetchAPI(`/posts/${id}`),
  createPost: (data: any) =>
    fetchAPI("/posts", { method: "POST", body: JSON.stringify(data) }),
  updatePost: (id: string, data: any) =>
    fetchAPI(`/posts/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deletePost: (id: string) => fetchAPI(`/posts/${id}`, { method: "DELETE" }),

  // Settings (singleton)
  getSettings: () => fetchAPI("/settings"),
  updateSettings: (data: any) =>
    fetchAPI("/settings", { method: "PUT", body: JSON.stringify(data) }),
  // Add other resources following same pattern
  // ...
};
