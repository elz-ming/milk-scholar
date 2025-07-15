interface TaskItemProps {
  number: number;
  text: string;
  onClick: () => void;
}

export default function TaskItem({ number, text, onClick }: TaskItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-between items-start bg-gray-100 rounded-lg p-4 text-left hover:bg-gray-200"
    >
      <span className="font-medium leading-snug">
        {number}. {text}
      </span>
      <span className="text-sm text-blue-600 mt-1">→</span>
    </button>
  );
}
