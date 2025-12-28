const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * GET /api/users
 * Admin only - get all users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        stores: {
          select: {
            store: {
              select: {
                id: true,
                name: true,
                type: true
              }
            }
          }
        }
      }
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * GET /api/users/:id
 * Admin only - get user by id
 */
exports.getUserById = async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        stores: {
          include: {
            store: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

/**
 * POST /api/users/:userId/stores/:storeId
 * Admin only - assign user to store
 */
exports.assignUserToStore = async (req, res) => {
  const userId = Number(req.params.userId);
  const storeId = Number(req.params.storeId);

  try {
    // Check user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check store exists
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) return res.status(404).json({ message: "Store not found" });

    // Prevent duplicate mapping
    const existing = await prisma.userStore.findFirst({
      where: { userId, storeId }
    });

    if (existing) {
      return res.status(400).json({ message: "User already assigned to this store" });
    }

    await prisma.userStore.create({
      data: { userId, storeId }
    });

    res.json({ message: "User assigned to store successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to assign user to store" });
  }
};

/**
 * DELETE /api/users/:userId/stores/:storeId
 * Admin only - remove user from store
 */
exports.removeUserFromStore = async (req, res) => {
  const userId = Number(req.params.userId);
  const storeId = Number(req.params.storeId);

  try {
    const mapping = await prisma.userStore.findFirst({
      where: { userId, storeId }
    });

    if (!mapping) {
      return res.status(404).json({ message: "Mapping not found" });
    }

    await prisma.userStore.delete({
      where: { id: mapping.id }
    });

    res.json({ message: "User removed from store successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove user from store" });
  }
};
