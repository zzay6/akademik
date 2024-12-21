import { PrismaClient } from "@prisma/client";
// import prismaAccelerate from '@prisma/accelerate';

// prismaAccelerate()

export const config = {
  runtime: "nodejs", // Gunakan Node.js runtime
};

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
