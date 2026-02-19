import { prisma } from "../outils/prisma.js";

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(userData) {
  return prisma.user.create({
    data: userData,
  });
}
export async function listUsers() {
  return prisma.user.findMany();
}

export async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function deleteUserById(id) {
  return prisma.user.delete({
    where: { id },
  });
}

export async function updateUserById(id, userData) {
  return prisma.user.update({
    where: { id },
    data: userData,
  });
}
