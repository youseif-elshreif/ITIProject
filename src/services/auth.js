import api from "./api";
// Login
export const login = async (credentials) => {
  try {
    const response = await api.get("/users");
    const users = response.data;

    const user = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (user) {
      const { password: _password, ...userWithoutPassword } = user;
      const userWithToken = {
        ...userWithoutPassword,
        token: `mock-token-${user.id}`,
      };
      localStorage.setItem("user", JSON.stringify(userWithToken));

      return { data: userWithToken };
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    if (error.message === "user not found") {
      throw error;
    }
    throw new Error("Login failed. Please try again.");
  }
};

// Register
export const register = async (userData) => {
  try {
    const response = await api.get("/users");
    const users = response.data;

    const existingUser = users.find((u) => u.username === userData.username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const newUser = {
      username: userData.username,
      password: userData.password,
    };

    const createResponse = await api.post("/users", newUser);
    const createdUser = createResponse.data;

    const { password: _password, ...userWithoutPassword } = createdUser;
    const userWithToken = {
      ...userWithoutPassword,
      token: `mock-token-${createdUser.id}`,
    };

    localStorage.setItem("user", JSON.stringify(userWithToken));

    return { data: userWithToken };
  } catch (error) {
    if (error.message === "Username already exists") {
      throw error;
    }
    throw new Error("Registration failed. Please try again.");
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem("user");
};

// Get current user from localStorage
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
