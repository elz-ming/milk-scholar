"use client";

import { Pencil } from "lucide-react";

type FieldItemProps = {
  label: string;
  value: string;
  isEditing: boolean;
  editingValue: string;
  onChange: (val: string) => void;
  onStartEdit: () => void;
  onSave: () => void;
};

export default function FieldItem({
  label,
  value,
  isEditing,
  editingValue,
  onChange,
  onStartEdit,
  onSave,
}: FieldItemProps) {
  return (
    <div className="flex items-center justify-between border p-3 rounded bg-white">
      <div className="flex-1">
        <p className="font-semibold">{label}</p>
        {isEditing ? (
          <input
            value={editingValue}
            onChange={(e) => onChange(e.target.value)}
            className="border p-1 mt-1 w-full"
          />
        ) : (
          <p className="text-gray-700">{value}</p>
        )}
      </div>
      {isEditing ? (
        <button
          onClick={onSave}
          className="ml-4 px-2 py-1 bg-green-600 text-white rounded"
        >
          Save
        </button>
      ) : (
        <button onClick={onStartEdit}>
          <Pencil size={20} />
        </button>
      )}
    </div>
  );
}
