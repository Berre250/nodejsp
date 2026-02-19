import { prisma } from "../outils/prisma.js";

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      password: false,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function createUser(userData) {
  return prisma.user.create({
    data: userData,
  });
}
export async function listUsers() {
  return prisma.user.findMany();
  select: {
    id: true;
    email: true;
    name: true;
    createdAt: true;
    updatedAt: true;
  }
}

export async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,

      createdAt: true,
      updatedAt: true,
    },
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
    select: {
      id: true,
      email: true,
      name: true,
      password: false,
      createdAt: true,
      updatedAt: true,
    },
  });
}
export async function searchUserByEmail(email) {
  return prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: false,
      createdAt: true,
      updatedAt: true,
    },
  });
}
export async function countUsers() {
  return prisma.user.count();
}
export async function updateUserPassword(id, newPassword) {
  return prisma.user.update({
    where: { id },
    data: { password: newPassword },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
