// middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const token = authHeader.split(" ")[1];

    // 1️⃣ Check token blacklist
    const blacklisted = await prisma.tokenBlacklist.findUnique({
      where: { token },
    });

    if (blacklisted) {
      return res.status(401).json({ message: "Token has been logged out" });
    }

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /**
     * ✅ NORMALIZED req.user
     * Always keep the same structure
     */
    req.user = {
      id: decoded.id || decoded.userId || decoded.sub,
      role: decoded.role,
      email: decoded.email,
    };

    if (!req.user.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
