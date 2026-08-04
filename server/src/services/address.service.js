const prisma = require("../config/prisma");

console.log("Loaded address.service.js");

const createAddress = async (userId, data) => {
  return await prisma.address.create({
    data: {
      ...data,
      country: data.country || "India",
      userId,
    },
  });
};

const getAllAddresses = async (userId) => {
  console.log("getAllAddresses() called");

  return await prisma.address.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getAddressById = async (userId, addressId) => {
  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      userId,
    },
  });

  if (!address) {
    throw new Error("Address not found.");
  }

  return address;
};

const updateAddress = async (userId, addressId, data) => {
  await getAddressById(userId, addressId);

  return await prisma.address.update({
    where: {
      id: addressId,
    },
    data,
  });
};

const deleteAddress = async (userId, addressId) => {
  await getAddressById(userId, addressId);

  await prisma.address.delete({
    where: {
      id: addressId,
    },
  });

  return {
    message: "Address deleted successfully.",
  };
};

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};

console.log("Exports:", module.exports);