const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

// ======================
// Register User
// ======================

const registerUser = async ({
  name,
  email,
  password,
  role,
}) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(400, "Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || "USER",
    },
  });

  const { password: _, ...safeUser } = user;

  return safeUser;
};

// ======================
// Login User
// ======================

const loginUser = async ({
  email,
  password,
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(
      400,
      "Invalid email or password."
    );
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new ApiError(
      400,
      "Invalid email or password."
    );
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  const { password: _, ...safeUser } = user;

  return {
    token,
    user: safeUser,
  };
};

// ======================
// Get Profile
// ======================

const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const { password: _, ...safeUser } = user;

  return safeUser;
};

// ======================
// Update Profile
// ======================

const updateUserProfile = async (
  userId,
  { name, email }
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (email && email !== user.email) {
    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exists) {
      throw new ApiError(
        400,
        "Email already exists."
      );
    }
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: name ?? user.name,
      email: email ?? user.email,
    },
  });

  const { password: _, ...safeUser } =
    updatedUser;

  return safeUser;
};

// ======================
// Change Password
// ======================

const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    throw new ApiError(
      400,
      "Current password is incorrect."
    );
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    10
  );

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return true;
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
};