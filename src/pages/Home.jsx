import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div
      className="h-[calc(100vh-64px-52px)]"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-main)",
      }}
    >
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-10 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Boost Your Productivity with{" "}
          <span style={{ color: "var(--color-primary)" }}>TodoApp</span>
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto mb-10"
          style={{ color: "var(--color-text-light)" }}
        >
          Organize your daily tasks, track your progress, and stay focused with
          our easy-to-use task manager.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/register"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "#fff",
                }}
                className="px-6 py-3 rounded-lg text-base font-medium shadow-sm transition hover:scale-105"
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    "var(--color-primary-hover)")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "var(--color-primary)")
                }
              >
                Get Started
              </Link>
              <Link
                to="/login"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid var(--color-primary)",
                  color: "var(--color-primary)",
                }}
                className="px-6 py-3 rounded-lg text-base font-medium shadow-sm transition hover:scale-105"
              >
                Sign In
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-md"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-text-white)",
              }}
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 pb-24">
        {[
          {
            title: "Task Management",
            desc: "Create, edit, and complete your daily tasks easily.",
            color: "var(--color-primary)",
            bg: "#e0e7ff",
          },
          {
            title: "Progress Tracking",
            desc: "Visualize your progress and stay motivated.",
            color: "var(--color-secondary)",
            bg: "#d1fae5",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "var(--color-bg-section)",
              border: "1px solid #e5e7eb",
            }}
            className="p-6 rounded-xl hover:shadow-md transition duration-200 flex flex-col items-center text-center"
          >
            <div
              style={{
                backgroundColor: feature.bg,
                color: feature.color,
              }}
              className="w-12 h-12 flex items-center justify-center rounded-full mb-4"
            >
              <span className="text-xl font-bold">{idx + 1}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm" style={{ color: "var(--color-text-light)" }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
