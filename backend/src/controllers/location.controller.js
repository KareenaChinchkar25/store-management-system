const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { getCoordinatesFromPincode } = require("../services/geo.service");
const { getDistanceInKm } = require("../utils/haversine");

exports.getNearestStores = async (req, res) => {
  try {
    const { pincode } = req.query;

    if (!pincode || pincode.length !== 6) {
      return res.status(400).json({ message: "Invalid pincode" });
    }

    // 1️⃣ Get coordinates for searched pincode
    const { latitude, longitude } = await getCoordinatesFromPincode(pincode);

    // 2️⃣ Fetch all active stores
    const stores = await prisma.store.findMany({
      where: { isActive: true }
    });

    // 3️⃣ Calculate distances
    const result = stores.map(store => ({
      storeId: store.id,
      storeName: store.name,
      storeType: store.type,
      address: store.address,
      pincode: store.pincode,
      distance: getDistanceInKm(
        latitude,
        longitude,
        store.latitude,
        store.longitude
      ).toFixed(2) + " km"
    }));

    // 4️⃣ Sort by distance
    result.sort(
      (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
    );

    res.json({
      searchedPincode: pincode,
      nearestStores: result
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
