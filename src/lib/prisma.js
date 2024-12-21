import { PrismaClient } from "@prisma/client";
export const config = {
  runtime: "nodejs",
};

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
