import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div
      className="min-h-[calc(100vh-64px-52px)] flex items-center justify-center px-4"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-main)",
      }}
    >
      <div className="text-center max-w-md mx-auto">
        {/* Error Icon */}
        <div className="mb-8">
          <FaExclamationTriangle
            className="mx-auto text-6xl mb-4"
            style={{ color: "var(--primary-600)" }}
          />
          <h1
            className="text-8xl font-bold mb-2"
            style={{ color: "var(--primary-600)" }}
          >
            404
          </h1>
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Page Not Found
          </h2>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <p
            className="text-lg mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-medium transition duration-200 hover:opacity-90"
            style={{
              backgroundColor: "var(--btn-primary-bg)",
              color: "var(--text-white)",
            }}
          >
            <FaHome className="mr-2" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-medium border transition duration-200 hover:opacity-90"
            style={{
              borderColor: "var(--gray-300)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
            }}
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div
          className="mt-8 pt-6 border-t"
          style={{ borderColor: "var(--gray-100)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Need help? Try going to the{" "}
            <Link
              to="/"
              className="underline hover:no-underline"
              style={{ color: "var(--primary-600)" }}
            >
              homepage
            </Link>{" "}
            or{" "}
            <Link
              to="/login"
              className="underline hover:no-underline"
              style={{ color: "var(--primary-600)" }}
            >
              login page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
