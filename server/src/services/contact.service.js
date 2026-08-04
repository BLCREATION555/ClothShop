const prisma = require("../config/prisma");

const createMessage = async (data) => {
  return await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    },
  });
};

const getAllMessages = async () => {
  return await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getMessageById = async (id) => {
  return await prisma.contactMessage.findUnique({
    where: {
      id,
    },
  });
};

const markAsRead = async (id) => {
  return await prisma.contactMessage.update({
    where: {
      id,
    },
    data: {
      isRead: true,
    },
  });
};

const deleteMessage = async (id) => {
  return await prisma.contactMessage.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  markAsRead,
  deleteMessage,
};