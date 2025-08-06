import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TodoSchema } from "../../utiles/Vaildation";
const TodoForm = ({
  onSubmit,
  initialValues = null,
  onCancel,
  isEditing = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    title: "",
    description: "",
    priority: "medium",
    dueDate: new Date().toISOString().split("T")[0],
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="p-6 rounded-lg shadow-md"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        {isEditing ? "Edit Todo" : "Add New Todo"}
      </h3>

      <Formik
        initialValues={initialValues || defaultValues}
        validationSchema={TodoSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Title
            </label>
            <Field
              id="title"
              name="title"
              type="text"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm"
              style={{
                borderColor: "var(--gray-300)",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
                focusRingColor: "var(--primary-500)",
              }}
              placeholder="Enter todo title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Description
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm"
              style={{
                borderColor: "var(--gray-300)",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
              placeholder="Enter todo description (optional)"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Priority
              </label>
              <Field
                as="select"
                id="priority"
                name="priority"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm"
                style={{
                  borderColor: "var(--gray-300)",
                  backgroundColor: "var(--bg-primary)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Field>
              <ErrorMessage
                name="priority"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Due Date
              </label>
              <Field
                id="dueDate"
                name="dueDate"
                type="date"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm"
                style={{
                  borderColor: "var(--gray-300)",
                  backgroundColor: "var(--bg-primary)",
                  color: "var(--text-primary)",
                }}
              />
              <ErrorMessage
                name="dueDate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition duration-200"
                style={{
                  borderColor: "var(--gray-300)",
                  backgroundColor: "var(--bg-primary)",
                  color: "var(--text-primary)",
                }}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--btn-primary-bg)",
                color: "var(--text-white)",
              }}
            >
              {isLoading ? "Saving..." : isEditing ? "Update Todo" : "Add Todo"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default TodoForm;
