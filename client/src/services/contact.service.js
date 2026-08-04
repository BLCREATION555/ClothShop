import api from "./api";

// Send Contact Message
export const sendMessage = async (data) => {
  const response = await api.post(
    "/contact",
    data
  );

  return response.data;
};

// Admin - Get All Messages
export const getMessages = async () => {
  const response = await api.get(
    "/contact"
  );

  return response.data;
};

// Admin - Mark Message as Read
export const markAsRead = async (id) => {
  const response = await api.patch(
    `/contact/${id}/read`
  );

  return response.data;
};

// Admin - Delete Message
export const deleteMessage = async (id) => {
  const response = await api.delete(
    `/contact/${id}`
  );

  return response.data;
};