import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("user name is required")
    .min(3, "User name must be at least 3 characters")
    .max(20, "User name must be less than 20 characters"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  description: Yup.string().max(
    500,
    "Description must be less than 500 characters"
  ),
  priority: Yup.string()
    .oneOf(["low", "medium", "high"], "Invalid priority")
    .required("Priority is required"),
  dueDate: Yup.date()
    .min(
      new Date().toISOString().split("T")[0],
      "Due date cannot be in the past"
    )
    .required("Due date is required"),
});
