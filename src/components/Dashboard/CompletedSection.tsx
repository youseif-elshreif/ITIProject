import React from "react";
import { FaCheckDouble } from "react-icons/fa";

function CompletedSection() {
  return (
    <div className="mt-10">
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: "var(--color-primary)" }}
      >
        Completed Tasks
      </h2>
      <div
        className="bg-white p-4 rounded shadow text-[var(--color-text-light)] flex items-center gap-2"
        style={{ backgroundColor: "var(--color-bg-section)" }}
      >
        <FaCheckDouble className="text-[var(--color-primary)]" />
        No completed tasks yet.
      </div>
    </div>
  );
}

export default CompletedSection;
