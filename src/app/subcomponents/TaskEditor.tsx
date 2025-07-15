"use client";

import { ArrowLeft } from "lucide-react"; // optional: install lucide-react or replace with emoji/icon

interface TaskEditorProps {
  task: {
    title?: string;
    text: string;
    type: "input" | "upload";
  };
  onClose: () => void;
}

export default function TaskEditor({ task, onClose }: TaskEditorProps) {
  return (
    <div className="fixed inset-0 bg-white z-150 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={onClose}
          className="text-[#e26f4a] flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
        <p className="text-sm text-gray-600 mb-6">{task.text}</p>

        {task.type === "input" ? (
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your answer here..."
          />
        ) : (
          <div className="w-full h-40 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500 text-sm">
            📎 Tap to upload a document (PDF/Image)
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 flex gap-3">
        <button
          onClick={onClose}
          className="w-1/2 py-3 bg-white text-[#e26f4a] rounded-lg font-medium border border-[#e26f4a]"
        >
          Cancel
        </button>
        <button
          onClick={onClose}
          className="w-1/2 py-3 bg-[#e26f4a] text-white rounded-lg font-medium"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
