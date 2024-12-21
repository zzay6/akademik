import prisma from "@/lib/prisma";
import getUser from "./get-user";

export const getRoom = async () => {
  const room = await prisma?.ruang?.findMany();
  return room;
};
