const addressService = require("../services/address.service");

const createAddress = async (req, res) => {
  try {
    console.log("\n========== CREATE ADDRESS ==========");
    console.log("Logged In User:", req.user);
    console.log("Request Body:", req.body);

    const address = await addressService.createAddress(
      req.user.id,
      req.body
    );

    console.log("Created Address:", address);
    console.log("====================================\n");

    res.status(201).json({
      success: true,
      message: "Address added successfully.",
      data: address,
    });
  } catch (error) {
    console.error("CREATE ADDRESS ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllAddresses = async (req, res) => {
  try {
    console.log("\n========== GET ALL ADDRESSES ==========");
    console.log("Logged In User:", req.user);
    console.log("req.user.id:", req.user.id);

    const addresses = await addressService.getAllAddresses(req.user.id);

    console.log("Addresses Returned:", addresses);
    console.log("Total Addresses:", addresses.length);
    console.log("=======================================\n");

    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error("GET ADDRESSES ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAddressById = async (req, res) => {
  try {
    console.log("\n========== GET ADDRESS BY ID ==========");
    console.log("Logged In User:", req.user);
    console.log("Address ID:", req.params.id);

    const address = await addressService.getAddressById(
      req.user.id,
      req.params.id
    );

    console.log("Address Found:", address);
    console.log("=======================================\n");

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.error("GET ADDRESS ERROR:", error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    console.log("\n========== UPDATE ADDRESS ==========");
    console.log("Logged In User:", req.user);
    console.log("Address ID:", req.params.id);
    console.log("Request Body:", req.body);

    const address = await addressService.updateAddress(
      req.user.id,
      req.params.id,
      req.body
    );

    console.log("Updated Address:", address);
    console.log("====================================\n");

    res.status(200).json({
      success: true,
      message: "Address updated successfully.",
      data: address,
    });
  } catch (error) {
    console.error("UPDATE ADDRESS ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    console.log("\n========== DELETE ADDRESS ==========");
    console.log("Logged In User:", req.user);
    console.log("Address ID:", req.params.id);

    const result = await addressService.deleteAddress(
      req.user.id,
      req.params.id
    );

    console.log(result);
    console.log("====================================\n");

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("DELETE ADDRESS ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};