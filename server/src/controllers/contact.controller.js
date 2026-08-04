const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  createMessage,
  getAllMessages,
  getMessageById,
  markAsRead,
  deleteMessage,
} = require("../services/contact.service");

const create = asyncHandler(async (req, res) => {
  console.log("BODY:", req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      req.body,
      "Contact API Working"
    )
  );
});
  

const getAll = asyncHandler(async (req, res) => {
  const messages = await getAllMessages();

  return res.status(200).json(
    new ApiResponse(
      200,
      messages,
      "Messages fetched successfully."
    )
  );
});

const getOne = asyncHandler(async (req, res) => {
  const message = await getMessageById(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      message,
      "Message fetched successfully."
    )
  );
});

const read = asyncHandler(async (req, res) => {
  const message = await markAsRead(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      message,
      "Message marked as read."
    )
  );
});

const remove = asyncHandler(async (req, res) => {
  await deleteMessage(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Message deleted successfully."
    )
  );
});

module.exports = {
  create,
  getAll,
  getOne,
  read,
  remove,
};