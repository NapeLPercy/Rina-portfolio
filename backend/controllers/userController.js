const bcrypt = require("bcrypt");
const { randomUUID } = require("crypto");
const userModel = require("../models/User");
const { generateRandomCode } = require("../utils/random");
const { signToken } = require("../utils/jwt");

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters" });
    }

    const existing = await userModel.findByUsername(username);
    if (existing) {
      return res.status(409).json({ message: "username already taken" });
    }

    const id = randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userModel.createUser({
      id,
      username,
      email: email || null,
      role: "ADMIN", // your sister/admin
      passwordHash,
    });

    return res.status(201).json({ message: "Account created", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required" });
    }

    const user = await userModel.findByUsername(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = signToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

//send code
async function sendCode(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const mail = await userModel.findUserEmail(email);

    if (!mail) {
      return res
        .status(401)
        .json({ success: false, message: "Email not found" });
    }

    //delete present code
    await userModel.deleteCode(email);

    const randomCode = generateRandomCode();

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const id = randomUUID();
    await userModel.saveCode(id, email, randomCode, expiresAt);

    return res.json({
      success: true,
      code: randomCode,
      message: "Emal found, Code generated",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

//verify code
async function verifyCode(req, res) {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .json({ success: false, message: "Verification code is required" });
    }

    const valid = await userModel.getValidCode(email);

    if (!valid) {
      return res
        .status(401)
        .json({ message: "Invalid verification code entered" });
    }

    if (valid.code !== code) {
      return res.json({
        message: "Invalid verification code entered",
        success: false,
      });
    }

    return res.json({
      message: "Verification code valid",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

//reset password and username
async function resetCredentials(req, res) {
  try {
    const { newUsername, email, newPassword } = req.body;

    if (!newUsername || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "username and password are required",
      });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at least 6 characters",
      });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    const date = new Date(Date.now());
    const updated = await userModel.updateCredentials(
      email,
      newUsername,
      passwordHash,
      date,
    );

    if (updated) {
      //if credentials updated, delete the record
      await userModel.deleteCode(email);
    }
    return res
      .status(201)
      .json({ message: "Username and Password updated", success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", success: false });
  }
}

module.exports = {login, sendCode, verifyCode, resetCredentials };
