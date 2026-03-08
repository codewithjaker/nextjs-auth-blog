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

// Categories
  getCategories: (params?: any) => fetchAPI(`/categories?${new URLSearchParams(params)}`),
  getCategory: (id: string) => fetchAPI(`/categories/${id}`),
  createCategory: (data: any) => fetchAPI('/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id: string, data: any) => fetchAPI(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id: string) => fetchAPI(`/categories/${id}`, { method: 'DELETE' }),

  // Posts (similar pattern)
  getPosts: (params?: any) => fetchAPI(`/posts?${new URLSearchParams(params)}`),
  getPost: (id: string) => fetchAPI(`/posts/${id}`),
  createPost: (data: any) =>
    fetchAPI("/posts", { method: "POST", body: JSON.stringify(data) }),
  updatePost: (id: string, data: any) =>
    fetchAPI(`/posts/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deletePost: (id: string) => fetchAPI(`/posts/${id}`, { method: "DELETE" }),

  // Comments
  getComments: (params?: any) => fetchAPI(`/comments?${new URLSearchParams(params)}`),
  getComment: (id: string) => fetchAPI(`/comments/${id}`),
  createComment: (data: any) => fetchAPI('/comments', { method: 'POST', body: JSON.stringify(data) }),
  updateComment: (id: string, data: any) => fetchAPI(`/comments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteComment: (id: string) => fetchAPI(`/comments/${id}`, { method: 'DELETE' }),


   // Follows
  getFollows: (params?: any) => fetchAPI(`/follows?${new URLSearchParams(params)}`),
  getFollow: (id: string) => fetchAPI(`/follows/${id}`),
  createFollow: (data: any) => fetchAPI('/follows', { method: 'POST', body: JSON.stringify(data) }),
  updateFollow: (id: string, data: any) => fetchAPI(`/follows/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteFollow: (id: string) => fetchAPI(`/follows/${id}`, { method: 'DELETE' }),

   // Reactions
  getReactions: (params?: any) => fetchAPI(`/reactions?${new URLSearchParams(params)}`),
  getReaction: (id: string) => fetchAPI(`/reactions/${id}`),
  createReaction: (data: any) => fetchAPI('/reactions', { method: 'POST', body: JSON.stringify(data) }),
  updateReaction: (id: string, data: any) => fetchAPI(`/reactions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteReaction: (id: string) => fetchAPI(`/reactions/${id}`, { method: 'DELETE' }),
  
  
  // Bookmarks
  getBookmarks: (params?: any) => fetchAPI(`/bookmarks?${new URLSearchParams(params)}`),
  getBookmark: (id: string) => fetchAPI(`/bookmarks/${id}`),
  createBookmark: (data: any) => fetchAPI('/bookmarks', { method: 'POST', body: JSON.stringify(data) }),
  updateBookmark: (id: string, data: any) => fetchAPI(`/bookmarks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBookmark: (id: string) => fetchAPI(`/bookmarks/${id}`, { method: 'DELETE' }),

    // Notifications
  getNotifications: (params?: any) => fetchAPI(`/notifications?${new URLSearchParams(params)}`),
  getNotification: (id: string) => fetchAPI(`/notifications/${id}`),
  createNotification: (data: any) => fetchAPI('/notifications', { method: 'POST', body: JSON.stringify(data) }),
  updateNotification: (id: string, data: any) => fetchAPI(`/notifications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteNotification: (id: string) => fetchAPI(`/notifications/${id}`, { method: 'DELETE' }),

    // Chat Rooms
  getChatRooms: (params?: any) => fetchAPI(`/chat-rooms?${new URLSearchParams(params)}`),
  getChatRoom: (id: string) => fetchAPI(`/chat-rooms/${id}`),
  createChatRoom: (data: any) => fetchAPI('/chat-rooms', { method: 'POST', body: JSON.stringify(data) }),
  updateChatRoom: (id: string, data: any) => fetchAPI(`/chat-rooms/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteChatRoom: (id: string) => fetchAPI(`/chat-rooms/${id}`, { method: 'DELETE' }),

  // Messages
  getMessages: (params?: any) => fetchAPI(`/messages?${new URLSearchParams(params)}`),
  getMessage: (id: string) => fetchAPI(`/messages/${id}`),
  createMessage: (data: any) => fetchAPI('/messages', { method: 'POST', body: JSON.stringify(data) }),
  updateMessage: (id: string, data: any) => fetchAPI(`/messages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMessage: (id: string) => fetchAPI(`/messages/${id}`, { method: 'DELETE' }),


  // Settings (singleton)
  getSettings: () => fetchAPI("/settings"),
  updateSettings: (data: any) =>
    fetchAPI("/settings", { method: "PUT", body: JSON.stringify(data) }),

  // Add these methods inside the api object
  getFAQs: (params?: any) => fetchAPI(`/faqs?${new URLSearchParams(params)}`),
  getFAQ: (id: string) => fetchAPI(`/faqs/${id}`),
  createFAQ: (data: any) =>
    fetchAPI("/faqs", { method: "POST", body: JSON.stringify(data) }),
  updateFAQ: (id: string, data: any) =>
    fetchAPI(`/faqs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteFAQ: (id: string) => fetchAPI(`/faqs/${id}`, { method: "DELETE" }),

  // Sliders
  getSliders: (params?: any) =>
    fetchAPI(`/sliders?${new URLSearchParams(params)}`),
  getSlider: (id: string) => fetchAPI(`/sliders/${id}`),
  createSlider: (data: any) =>
    fetchAPI("/sliders", { method: "POST", body: JSON.stringify(data) }),
  updateSlider: (id: string, data: any) =>
    fetchAPI(`/sliders/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSlider: (id: string) =>
    fetchAPI(`/sliders/${id}`, { method: "DELETE" }),

  // Social Links
  getSocialLinks: (params?: any) =>
    fetchAPI(`/social-links?${new URLSearchParams(params)}`),
  getSocialLink: (id: string) => fetchAPI(`/social-links/${id}`),
  createSocialLink: (data: any) =>
    fetchAPI("/social-links", { method: "POST", body: JSON.stringify(data) }),
  updateSocialLink: (id: string, data: any) =>
    fetchAPI(`/social-links/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteSocialLink: (id: string) =>
    fetchAPI(`/social-links/${id}`, { method: "DELETE" }),

  // Menus
  getMenus: (params?: any) => fetchAPI(`/menus?${new URLSearchParams(params)}`),
  getMenu: (id: string) => fetchAPI(`/menus/${id}`),
  createMenu: (data: any) =>
    fetchAPI("/menus", { method: "POST", body: JSON.stringify(data) }),
  updateMenu: (id: string, data: any) =>
    fetchAPI(`/menus/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteMenu: (id: string) => fetchAPI(`/menus/${id}`, { method: "DELETE" }),

   // Pages
  getPages: (params?: any) => fetchAPI(`/pages?${new URLSearchParams(params)}`),
  getPage: (id: string) => fetchAPI(`/pages/${id}`),
  createPage: (data: any) => fetchAPI('/pages', { method: 'POST', body: JSON.stringify(data) }),
  updatePage: (id: string, data: any) => fetchAPI(`/pages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePage: (id: string) => fetchAPI(`/pages/${id}`, { method: 'DELETE' }),

   // Activity Logs
  getActivityLogs: (params?: any) => fetchAPI(`/activity-logs?${new URLSearchParams(params)}`),
  getActivityLog: (id: string) => fetchAPI(`/activity-logs/${id}`),
  createActivityLog: (data: any) => fetchAPI('/activity-logs', { method: 'POST', body: JSON.stringify(data) }),
  updateActivityLog: (id: string, data: any) => fetchAPI(`/activity-logs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteActivityLog: (id: string) => fetchAPI(`/activity-logs/${id}`, { method: 'DELETE' }),

  // Add other resources following same pattern
  // ...
};
