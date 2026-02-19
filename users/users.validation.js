function isNonEmptyString(value) {
  return typeof value === "string" && value.length > 0;
}

function isEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(value);
}

function isStrongPassword(value) {
  return typeof value === "string" && value.length >= 8;
}

export function validateUser(userData) {
  const errors = {};

  const email = userData.email;
  const password = userData.password;
  const name = userData.name;

  if (!isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (!isStrongPassword(password)) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (!isNonEmptyString(name)) {
    errors.name = "Name must be a non-empty string";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: userData,
  };
}

export function validateUpdateUser(userData) {
  const errors = {};
  const data = {};

  if (userData.email !== undefined) {
    if (!isEmail(userData.email)) errors.email = "Email is invalid";
    else data.email = userData.email;
  }

  if (userData.password !== undefined) {
    if (!isStrongPassword(userData.password))
      errors.password = "Password must be at least 8 characters long.";
    else data.password = userData.password;
  }

  if (userData.name !== undefined) {
    if (!isNonEmptyString(userData.name)) errors.name = "Name is required";
    else data.name = userData.name;
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data,
  };
}
