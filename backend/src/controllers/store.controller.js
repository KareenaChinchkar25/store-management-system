const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const geoService = require("../services/geo.service");

exports.getStoreById = async (req, res) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.json(store);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to fetch store" });
  }
};


exports.getStores = async (req, res) => {
  try {
    let stores;

    if (req.user.role === "admin") {
      stores = await prisma.store.findMany();
    } else {
      stores = await prisma.store.findMany({
        where: {
          users: {
            some: { userId: req.user.userId }
          }
        }
      });
    }

    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stores" });
  }
};

exports.createStore = async (req, res) => {
  try {
    const { latitude, longitude } =
      await geoService.getCoordinatesFromPincode(req.body.pincode);

    const store = await prisma.store.create({
      data: {
        name: req.body.name,
        type: req.body.type,
        address: req.body.address,
        pincode: req.body.pincode,
        contact: req.body.contact,
        hours: req.body.hours,
        latitude,
        longitude,
        isActive: true
      }
    });

    res.json(store);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Store creation failed" });
  }
};

exports.updateStore = async (req, res) => {
  try {
    const store = await prisma.store.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(store);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const storeId = Number(req.params.id);

    // Remove user-store mappings first
    await prisma.userStore.deleteMany({
      where: { storeId }
    });

    // Now delete store
    await prisma.store.delete({
      where: { id: storeId }
    });

    res.json({ message: "Store deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Delete failed" });
  }
};

