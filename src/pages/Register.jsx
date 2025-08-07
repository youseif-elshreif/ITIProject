import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterSchema } from "../utiles/Vaildation";
import { Link, useNavigate } from "react-router";
import { register } from "../services/auth";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: setUser } = useAuth();

  const handleRegister = async (values) => {
    setIsLoading(true);
    setError("");
    try {
      let response = await register(values);
      if (response && response.data) {
        setUser(response.data);
        navigate("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="h-[calc(100vh-64px-52px)] flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-lg shadow-md"
        style={{ backgroundColor: "var(--color-bg-section)" }}
      >
        <h2
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "var(--color-primary)" }}
        >
          Register
        </h2>

        <Formik
          initialValues={{
            username: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          <Form className="space-y-5">
            {error && (
              <p
                className="text-sm mb-4 p-3 rounded-md border"
                style={{
                  color: "var(--btn-danger-bg)",
                  backgroundColor: "var(--primary-50)",
                  borderColor: "var(--btn-danger-bg)",
                }}
              >
                {error}
              </p>
            )}
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block mb-1"
                style={{ color: "var(--color-text-main)" }}
              >
                Username
              </label>
              <Field
                name="username"
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-sm mt-1"
                style={{ color: "red" }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1"
                style={{ color: "var(--color-text-main)" }}
              >
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-sm mt-1"
                style={{ color: "red" }}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1"
                style={{ color: "var(--color-text-main)" }}
              >
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-sm mt-1"
                style={{ color: "red" }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white py-2 rounded-md transition duration-200 disabled:opacity-50"
              style={{
                backgroundColor: isLoading
                  ? "var(--gray-500)"
                  : "var(--btn-primary-bg)",
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor =
                    "var(--btn-primary-hover)";
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor =
                    "var(--btn-primary-bg)";
                }
              }}
            >
              {isLoading ? "Creating Account..." : "Register"}
            </button>
          </Form>
        </Formik>
        <div className="text-center mt-4">
          <p className="text-sm" style={{ color: "var(--color-text-light)" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[var(--color-primary)] hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
