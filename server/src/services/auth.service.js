const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const {
  sendPasswordResetEmail,
} = require("./email.service");

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

// ======================
// Forgot Password
// ======================

const forgotPassword = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Don't reveal if email exists
  if (!user) {
    return true;
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date(
    Date.now() + 15 * 60 * 1000
  );

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetToken,
      resetTokenExpiresAt: expiresAt,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  await sendPasswordResetEmail(
    user.email,
    user.name,
    resetLink
  );

  return true;
};

// ======================
// Reset Password
// ======================

const resetPassword = async (
  token,
  newPassword
) => {
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new ApiError(
      400,
      "Reset link is invalid or expired."
    );
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    10
  );

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiresAt: null,
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
  forgotPassword,
  resetPassword,
};