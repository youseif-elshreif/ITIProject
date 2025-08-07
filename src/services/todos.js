import api from "./api";

// Get all todos for a specific user
export const getTodos = async (userId) => {
  try {
    let url = `/todos?userId=${userId}`;

    const response = await api.get(url);
    let todos = response.data;

    return { data: todos };
  } catch {
    throw new Error("Failed to fetch todos");
  }
};

// Create a new todo
export const createTodo = async (todoData) => {
  try {
    const todoId = String(Date.now());

    const response = await api.post("/todos", {
      ...todoData,
      id: todoId,
      status: "pending",
    });
    return { data: response.data };
  } catch (error) {
    throw new Error(
      `Failed to create todo: ${error.response?.data?.message || error.message}`
    );
  }
};

// Update an existing todo
export const updateTodo = async (id, todoData) => {
  try {
    const todoId = String(id);
    const response = await api.put(`/todos/${todoId}`, todoData);
    return { data: response.data };
  } catch (error) {
    throw new Error(
      `Failed to update todo: ${error.response?.data?.message || error.message}`
    );
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    const todoId = String(id);
    await api.delete(`/todos/${todoId}`);
    return { success: true };
  } catch (error) {
    throw new Error(
      `Failed to delete todo: ${error.response?.data?.message || error.message}`
    );
  }
};

// Toggle todo completion status
export const toggleTodoStatus = async (id, currentStatus) => {
  try {
    const todoId = id.toString();
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    const response = await api.patch(`/todos/${todoId}`, { status: newStatus });
    return { data: response.data };
  } catch (error) {
    throw new Error(
      `Failed to toggle todo status: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};
