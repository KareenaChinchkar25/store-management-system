const prisma = require("../config/db");
const passwordService = require("../services/password.service");
const jwtService = require("../services/jwt.service");

/**
 * REGISTER
 * POST /api/auth/register
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const hashedPassword = await passwordService.hash(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        role,
        password: hashedPassword
      }
    });

    res.json({
      id: user.id,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

/**
 * LOGIN
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { stores: true }
    });

    if (
      !user ||
      !(await passwordService.compare(password, user.password))
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwtService.signToken({
      userId: user.id,
      role: user.role,
      storeIds: user.stores.map(s => s.storeId)
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

/**
 * LOGOUT
 * POST /api/auth/logout
 */
exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decoded = req.user;

    await prisma.tokenBlacklist.create({
      data: {
        token,
        expiresAt: new Date(decoded.exp * 1000)
      }
    });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
};
