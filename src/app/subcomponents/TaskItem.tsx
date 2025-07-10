"use client";

type TaskItemProps = {
  number: number;
  text: string;
  completed: boolean;
  onToggle: () => void;
};

export default function TaskItem({
  number,
  text,
  completed,
  onToggle,
}: TaskItemProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-start gap-4 w-full h-16 px-4 rounded-lg border shadow-sm text-left transition ${
        completed ? "bg-gray-200 line-through" : "bg-gray-50"
      }`}
    >
      <div className="w-6 text-lg font-bold">{number}.</div>
      <div className="flex-1 truncate">{text}</div>
    </button>
  );
}
