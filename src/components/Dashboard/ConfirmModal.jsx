import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmModal = ({
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-shrink-0">
            <FaExclamationTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3
              className="text-lg font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h3>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {message}
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-sm font-medium transition duration-200"
            style={{
              borderColor: "var(--gray-300)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
            }}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition duration-200"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
