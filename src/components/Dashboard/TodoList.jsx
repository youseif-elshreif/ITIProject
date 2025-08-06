import React from "react";
import { FaClock, FaFlag, FaCheck, FaEdit, FaTrash } from "react-icons/fa";

const TodoList = ({ todos, onToggleComplete, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "var(--btn-danger-bg)";
      case "medium":
        return "#eab308";
      case "low":
        return "var(--green-600)";
      default:
        return "var(--gray-500)";
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return "Normal";
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && dueDate;
  };

  if (todos.length === 0) {
    return (
      <div
        className="text-center py-12 rounded-lg"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          No todos found. Create your first todo!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`p-4 rounded-lg shadow-md border-l-4 transition duration-200 ${
            todo.status === "completed" ? "opacity-75" : ""
          }`}
          style={{
            backgroundColor: "var(--bg-primary)",
            borderLeftColor: getPriorityColor(todo.priority),
          }}
        >
          <div className="flex items-start justify-between flex-wrap lg:flex-nowrap">
            <div className="flex items-start space-x-3 flex-1">
              {/* Checkbox */}
              <button
                onClick={() => onToggleComplete(todo.id)}
                className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition duration-200 ${
                  todo.status === "completed"
                    ? "border-green-500 bg-green-500"
                    : "border-gray-300 hover:border-green-400"
                }`}
              >
                {todo.status === "completed" && (
                  <FaCheck className="text-white text-xs" />
                )}
              </button>

              {/* Todo Content */}
              <div className="flex-1 mb-1 sm:mb-0 ">
                <h3
                  className={`font-semibold w-fit ${
                    todo.status === "completed" ? "line-through" : ""
                  }`}
                  style={{
                    color:
                      todo.status === "completed"
                        ? "var(--text-secondary)"
                        : "var(--text-primary)",
                  }}
                >
                  {todo.title}
                </h3>

                {todo.description && (
                  <p
                    className={`text-sm mt-1 ${
                      todo.status === "completed" ? "line-through" : ""
                    }`}
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {todo.description}
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex items-center space-x-4 mt-2">
                  {/* Priority */}
                  <div className="flex items-center space-x-1">
                    <FaFlag
                      className="text-xs"
                      style={{ color: getPriorityColor(todo.priority) }}
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: getPriorityColor(todo.priority) }}
                    >
                      {getPriorityText(todo.priority)}
                    </span>
                  </div>

                  {/* Due Date */}
                  {todo.dueDate && (
                    <div className="flex items-center space-x-1">
                      <FaClock
                        className="text-xs"
                        style={{
                          color:
                            isOverdue(todo.dueDate) &&
                            todo.status !== "completed"
                              ? "var(--btn-danger-bg)"
                              : "var(--text-secondary)",
                        }}
                      />
                      <span
                        className="text-xs"
                        style={{
                          color:
                            isOverdue(todo.dueDate) &&
                            todo.status !== "completed"
                              ? "var(--btn-danger-bg)"
                              : "var(--text-secondary)",
                        }}
                      >
                        {new Date(todo.dueDate).toLocaleDateString()}
                      </span>
                      {isOverdue(todo.dueDate) &&
                        todo.status !== "completed" && (
                          <span
                            className="text-xs font-medium"
                            style={{ color: "var(--btn-danger-bg)" }}
                          >
                            (Overdue)
                          </span>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(todo)}
                className="p-2 rounded-md transition duration-200 hover:opacity-80"
                style={{ backgroundColor: "var(--gray-100)" }}
                title="Edit todo"
              >
                <FaEdit
                  className="text-sm"
                  style={{ color: "var(--primary-600)" }}
                />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 rounded-md transition duration-200 hover:opacity-80"
                style={{ backgroundColor: "var(--gray-100)" }}
                title="Delete todo"
              >
                <FaTrash
                  className="text-sm"
                  style={{ color: "var(--btn-danger-bg)" }}
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
