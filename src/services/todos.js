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
    console.log("Creating todo with data:", todoData);
    const todoId = String(Date.now());

    const response = await api.post("/todos", {
      ...todoData,
      id: todoId,
      status: "pending",
    });
    console.log("Create response:", response);
    return { data: response.data };
  } catch (error) {
    console.error("Create todo error:", error.response?.data || error.message);
    throw new Error(
      `Failed to create todo: ${error.response?.data?.message || error.message}`
    );
  }
};

// Update an existing todo
export const updateTodo = async (id, todoData) => {
  try {
    console.log("Updating todo with ID:", id, "Data:", todoData);
    const todoId = String(id);
    const response = await api.put(`/todos/${todoId}`, todoData);
    console.log("Update response:", response);
    return { data: response.data };
  } catch (error) {
    console.error("Update todo error:", error.response?.data || error.message);
    throw new Error(
      `Failed to update todo: ${error.response?.data?.message || error.message}`
    );
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    console.log("Deleting todo with ID:", id);
    const todoId = String(id);
    await api.delete(`/todos/${todoId}`);
    console.log("Successfully deleted todo:", todoId);
    return { success: true };
  } catch (error) {
    console.error("Delete todo error:", error.response?.data || error.message);
    throw new Error(
      `Failed to delete todo: ${error.response?.data?.message || error.message}`
    );
  }
};

// Toggle todo completion status
export const toggleTodoStatus = async (id, currentStatus) => {
  try {
    console.log(
      "Toggling todo status for ID:",
      id,
      "Current status:",
      currentStatus
    );
    const todoId = id.toString();
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    const response = await api.patch(`/todos/${todoId}`, { status: newStatus });
    console.log("Toggle response:", response);
    return { data: response.data };
  } catch (error) {
    console.error(
      "Toggle todo status error:",
      error.response?.data || error.message
    );
    throw new Error(
      `Failed to toggle todo status: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};
