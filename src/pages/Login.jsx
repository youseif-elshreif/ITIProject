import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../utiles/Vaildation";
import { Link, useNavigate } from "react-router";
import { login } from "../services/auth";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login: setUser } = useAuth();

  const handleLogin = async (values) => {
    setIsLoading(true);
    setError(""); // مسح الأخطاء السابقة
    try {
      let response = await login(values);
      // التحقق من وجود البيانات قبل الوصول إليها
      if (response && response.data) {
        setUser(response.data);
        navigate("/dashboard"); // توجيه إلى صفحة Dashboard
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="min-h-[calc(100vh-64px-52px)] flex items-center justify-center px-4"
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
          Login
        </h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
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
                User Name
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white py-2 rounded-md transition duration-200"
              style={{
                backgroundColor: "var(--color-primary)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-primary-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-primary)")
              }
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </Form>
        </Formik>
        <div>
          <p
            className="text-center text-sm mt-4"
            style={{ color: "var(--color-text-light)" }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[var(--color-primary)] hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
