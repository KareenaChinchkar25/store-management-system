const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getCoordinatesFromPincode = async (pincode) => {
  // 1️⃣ Check cache first
  const cached = await prisma.pincode.findUnique({
    where: { pincode }
  });

  if (cached) {
    return {
      latitude: cached.latitude,
      longitude: cached.longitude
    };
  }

  // 2️⃣ Call OpenStreetMap (Nominatim)
  const url = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pincode}&country=india`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent": "store-management-system"
    }
  });

  if (!response.data || response.data.length === 0) {
    throw new Error("Invalid pincode");
  }

  const latitude = parseFloat(response.data[0].lat);
  const longitude = parseFloat(response.data[0].lon);

  // 3️⃣ Save to DB cache (SAFE)
  await prisma.pincode.upsert({
    where: { pincode },
    update: {
      latitude,
      longitude
    },
    create: {
      pincode,
      latitude,
      longitude
    }
  });

  return { latitude, longitude };
};
