import React, { useState, useEffect } from "react";
import { FaClipboardList, FaPlus, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import {
  getTodos,
  toggleTodoStatus,
  deleteTodo,
  createTodo,
  updateTodo,
} from "../services/todos";
import TodoFilters from "../components/Dashboard/TodoFilters";
import TodoList from "../components/Dashboard/TodoList";
import TodoForm from "../components/Dashboard/TodoForm";
import ConfirmModal from "../components/Dashboard/ConfirmModal";

const filterTodosLocally = (todosData, currentFilters) => {
  let filtered = [...todosData];

  if (currentFilters.status !== "all") {
    filtered = filtered.filter((todo) => todo.status === currentFilters.status);
  }

  if (currentFilters.sortBy) {
    filtered.sort((a, b) => {
      switch (currentFilters.sortBy) {
        case "priority": {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (
            (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
          );
        }
        case "dueDate":
          return (
            new Date(a.dueDate || "9999-12-31") -
            new Date(b.dueDate || "9999-12-31")
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }

  return filtered;
};

const Dashboard = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    sortBy: "",
  });

  // States for edit form
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // States for add form
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // States for delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  // Fetch all todos
  useEffect(() => {
    const fetchAllTodos = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const userId = parseInt(user.id) || user.id;
        const response = await getTodos(userId);
        const todoData = response.data;
        const allTodosData = Array.isArray(todoData) ? todoData : [];
        setAllTodos(allTodosData);
      } catch {
        setAllTodos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTodos();
  }, [user]);

  // Filter todos
  useEffect(() => {
    if (Array.isArray(allTodos)) {
      const filteredTodos = filterTodosLocally(allTodos, filters);
      setTodos(filteredTodos);
    }
  }, [allTodos, filters]);

  const handleToggleComplete = async (todoId) => {
    try {
      const todo = allTodos.find((t) => t.id === todoId);
      await toggleTodoStatus(todoId, todo.status);
      setAllTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todoId
            ? {
                ...t,
                status: t.status === "completed" ? "pending" : "completed",
              }
            : t
        )
      );
    } catch (error) {
      // Handle error silently or show user-friendly error
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsEditFormOpen(true);
  };

  const handleDelete = (todoId) => {
    setTodoToDelete(todoId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTodo(todoToDelete);
      setAllTodos((prevTodos) =>
        prevTodos.filter((t) => t.id !== todoToDelete)
      );
      setIsDeleteModalOpen(false);
      setTodoToDelete(null);
    } catch (error) {
      // Handle error silently or show user-friendly error
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = {
        ...todoData,
        userId: parseInt(user.id) || user.id,
        status: "pending",
        // إزالة الـ temporary ID لأن الخدمة تُعيّن ID string الآن
      };

      const response = await createTodo(newTodo);
      const createdTodo = response.data;

      // إضافة المهمة الجديدة للبيانات المحلية
      setAllTodos((prevTodos) => [...prevTodos, createdTodo]);
      setIsAddFormOpen(false);
    } catch (error) {
      // Handle error silently or show user-friendly error
    }
  };

  const handleUpdateTodo = async (todoData) => {
    try {
      // إضافة userId و status للبيانات المحدثة
      const updatedTodoData = {
        ...todoData,
        userId: editingTodo.userId || parseInt(user.id) || user.id,
        status: editingTodo.status || "pending",
      };

      const response = await updateTodo(editingTodo.id, updatedTodoData);
      const updatedTodo = response.data;

      // تحديث المهمة في البيانات المحلية
      setAllTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === editingTodo.id ? updatedTodo : t))
      );
      setIsEditFormOpen(false);
      setEditingTodo(null);
    } catch (error) {
      // Handle error silently or show user-friendly error
    }
  };

  const stats = {
    total: Array.isArray(allTodos) ? allTodos.length : 0,
    pending: Array.isArray(allTodos)
      ? allTodos.filter((t) => t.status === "pending").length
      : 0,
    completed: Array.isArray(allTodos)
      ? allTodos.filter((t) => t.status === "completed").length
      : 0,
    overdue: Array.isArray(allTodos)
      ? allTodos.filter((t) => {
          return (
            t.status === "pending" &&
            t.dueDate &&
            new Date(t.dueDate) < new Date()
          );
        }).length
      : 0,
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-main)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <FaClipboardList style={{ color: "var(--primary-600)" }} />
          My To-Do List
        </h1>
        {/* User Welcome Section */}
        <div
          className="mb-8 p-6 rounded-lg shadow-lg"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--primary-100)" }}
              >
                <FaUser
                  className="text-xl"
                  style={{ color: "var(--primary-600)" }}
                />
              </div>
              <div>
                <h2
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Welcome back, {user?.username || "User"}!
                </h2>
                <p style={{ color: "var(--text-secondary)" }}>
                  Ready to manage your tasks today?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Todo Filters */}
        <TodoFilters
          filters={filters}
          onFilterChange={setFilters}
          stats={stats}
        />

        {/* Add Task btn */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setIsAddFormOpen(true)}
            className="px-4 py-2 rounded-md flex items-center gap-2 transition duration-200"
            style={{
              backgroundColor: "var(--btn-primary-bg)",
              color: "var(--text-white)",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--btn-primary-hover)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--btn-primary-bg)")
            }
          >
            <FaPlus /> Add Task
          </button>
        </div>

        {/* Todo List */}
        {loading ? (
          <div className="text-center py-8">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
              style={{ borderColor: "var(--primary-600)" }}
            ></div>
            <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
              Loading todos...
            </p>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {/* Add Todo Form */}
        {isAddFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-md w-full mx-4">
              <TodoForm
                onSubmit={handleAddTodo}
                onCancel={() => setIsAddFormOpen(false)}
                isEditing={false}
              />
            </div>
          </div>
        )}

        {/* Edit Todo Form */}
        {isEditFormOpen && editingTodo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-md w-full mx-4">
              <TodoForm
                onSubmit={handleUpdateTodo}
                onCancel={() => {
                  setIsEditFormOpen(false);
                  setEditingTodo(null);
                }}
                initialValues={{
                  title: editingTodo.title,
                  description: editingTodo.description || "",
                  priority: editingTodo.priority,
                  dueDate: editingTodo.dueDate
                    ? editingTodo.dueDate.split("T")[0]
                    : new Date().toISOString().split("T")[0],
                }}
                isEditing={true}
              />
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <ConfirmModal
            onClose={() => {
              setIsDeleteModalOpen(false);
              setTodoToDelete(null);
            }}
            onConfirm={handleConfirmDelete}
            title="Delete Todo"
            message="Are you sure you want to delete this todo? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
