import {
  createUser,
  findUserByEmail,
  listUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  countUsers,
  updateUserPassword,
} from "./users.service.js";
import { validateUser, validateUpdateUser } from "./users.validation.js";

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

    // 🔍 VÉRIFICATION COMPLète
    const validFields = ["email", "password", "name"];
    const hasValidField =
      req.body && validFields.some((field) => field in req.body);

    if (!hasValidField) {
      return res.status(400).json({
        error: "Validation error",
        fields: {
          body: "Provide at least one field to update (email, password, or name)",
        },
      });
    }

    // Vérifier si l'utilisateur existe
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Valider les données (validation partielle)
    const validation = validateUpdateUser(req.body);
    if (!validation.ok) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Vérification du conflit d'email (si fourni)
    if (validation.data.email !== undefined) {
      const userWithEmail = await findUserByEmail(validation.data.email);
      if (userWithEmail && userWithEmail.id !== id) {
        return res.status(409).json({
          error: "Email already in use",
        });
      }
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await updateUserById(id, validation.data);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function handleSearchUsers(req, res) {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }

    const cleanEmail = email.trim();

    const user = await findUserByEmail(cleanEmail);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
export async function handleCountUsers(req, res) {
  try {
    const count = await countUsers();

    return res.status(200).json({
      "Users count": count,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function handleUpdatePassword(req, res) {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // Vérifier si l'ID est fourni
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Vérifier si le password est fourni
    if (!password) {
      return res.status(400).json({
        error: "Validation error",
        fields: {
          password: "Password is required",
        },
      });
    }

    // Valider la longueur du password (min 8 caractères)
    if (password.length < 8) {
      return res.status(400).json({
        error: "Validation error",
        fields: {
          password: "Password must be at least 8 characters long",
        },
      });
    }

    // Vérifier si l'utilisateur existe
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Mettre à jour uniquement le mot de passe
    const updatedUser = await updateUserPassword(id, password);

    // Retourner l'utilisateur sans le password (déjà géré par le select)
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
