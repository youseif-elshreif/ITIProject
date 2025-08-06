import React from "react";

const TodoFilters = ({ filters, onFilterChange, stats }) => {
  const handleStatusChange = (status) => {
    onFilterChange({ ...filters, status });
  };

  const handleSortChange = (sortBy) => {
    onFilterChange({ ...filters, sortBy });
  };

  return (
    <div
      className="rounded-lg shadow-md p-4 mb-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Status Filters */}
        <div className="flex items-center sm:space-x-4 flex-wrap mt-2 lg:mt-0">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Filter by status:
          </span>
          <div className="flex space-x-2 flex-wrap">
            <button
              onClick={() => handleStatusChange("all")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition duration-200 ${
                filters.status === "all" ? "text-white" : "hover:opacity-80"
              }`}
              style={{
                backgroundColor:
                  filters.status === "all"
                    ? "var(--primary-600)"
                    : "var(--gray-100)",
                color:
                  filters.status === "all"
                    ? "var(--text-white)"
                    : "var(--text-primary)",
              }}
            >
              All
            </button>
            <button
              onClick={() => handleStatusChange("pending")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition duration-200 ${
                filters.status === "pending" ? "text-white" : "hover:opacity-80"
              }`}
              style={{
                backgroundColor:
                  filters.status === "pending"
                    ? "var(--primary-600)"
                    : "var(--gray-100)",
                color:
                  filters.status === "pending"
                    ? "var(--text-white)"
                    : "var(--text-primary)",
              }}
            >
              Pending
            </button>
            <button
              onClick={() => handleStatusChange("completed")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition duration-200 mt-1 sm:mt-0 ${
                filters.status === "completed"
                  ? "text-white"
                  : "hover:opacity-80"
              }`}
              style={{
                backgroundColor:
                  filters.status === "completed"
                    ? "var(--primary-600)"
                    : "var(--gray-100)",
                color:
                  filters.status === "completed"
                    ? "var(--text-white)"
                    : "var(--text-primary)",
              }}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-4">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Sort by:
          </span>
          <select
            value={filters.sortBy || ""}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2"
            style={{
              borderColor: "var(--gray-300)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
            }}
          >
            <option value="">Default</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div
        className="mt-4 pt-4 border-t"
        style={{ borderColor: "var(--gray-100)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div>
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--primary-600)" }}
            >
              {stats.total}
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Total Tasks
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: "#eab308" }}>
              {stats.pending}
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Pending
            </p>
          </div>
          <div>
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--green-600)" }}
            >
              {stats.completed}
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoFilters;
