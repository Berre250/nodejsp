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

export function validateUserUpdate(userData) {
  const errors = {};

  const email = userData.email;
  const password = userData.password;
  const name = userData.name;

  if (email !== undefined && !isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (password !== undefined && !isStrongPassword(password)) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (name !== undefined && !isNonEmptyString(name)) {
    errors.name = "Name must be a non-empty string";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: userData,
  };
}
