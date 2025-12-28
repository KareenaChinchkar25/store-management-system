const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data (safe for dev)
  await prisma.userStore.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();

  // Passwords
  const adminPass = await bcrypt.hash("admin123", 10);
  const managerPass = await bcrypt.hash("manager123", 10);
  const employeePass = await bcrypt.hash("employee123", 10);

  // Users
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@test.com",
      password: adminPass,
      role: "admin"
    }
  });

  const manager = await prisma.user.create({
    data: {
      username: "manager",
      email: "manager@test.com",
      password: managerPass,
      role: "manager"
    }
  });

  const employee = await prisma.user.create({
    data: {
      username: "employee",
      email: "employee@test.com",
      password: employeePass,
      role: "employee"
    }
  });

  // Stores
  const store1 = await prisma.store.create({
    data: {
      name: "FreshMart Grocery",
      type: "Grocery",
      address: "MG Road, Pune",
      pincode: "411001",
      latitude: 18.5204,
      longitude: 73.8567,
      contact: "9999999999",
      hours: "8 AM - 10 PM",
      isActive: true
    }
  });

  const store2 = await prisma.store.create({
    data: {
      name: "TechZone Electronics",
      type: "Electronics",
      address: "FC Road, Pune",
      pincode: "411004",
      latitude: 18.5145,
      longitude: 73.8416,
      contact: "8888888888",
      hours: "10 AM - 9 PM",
      isActive: true
    }
  });

  // User-Store Mapping
  await prisma.userStore.createMany({
    data: [
      { userId: manager.id, storeId: store1.id },
      { userId: manager.id, storeId: store2.id },
      { userId: employee.id, storeId: store1.id }
    ]
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
