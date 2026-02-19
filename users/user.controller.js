import {
  createUser,
  findUserByEmail,
  listUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} from "./users.service.js";
import { validateUser } from "./users.validation.js";

export async function handleCreateUser(req, res) {
  try {
    // validate user input

    const result = validateUser(req.body);

    if (!result.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.errors,
      });
    }

    // check if user already exists
    const existingUser = await findUserByEmail(result.data.email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create User
    const user = await createUser(result.data);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
export async function handleListUsers(req, res) {
  try {
    const users = await listUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function handleGetUserById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
export async function handleDeleteUser(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await deleteUserById(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function handleUpdateUser(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const existingUser = await getUserById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = validateUser(req.body);

    if (!result.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.errors,
      });
    }

    const updatedUser = await updateUserById(id, result.data);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
