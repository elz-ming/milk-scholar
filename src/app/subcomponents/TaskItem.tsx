interface TaskItemProps {
  number: number;
  text: string;
  onClick: () => void;
}

export default function TaskItem({ number, text, onClick }: TaskItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow-sm hover:bg-gray-200 z-0"
    >
      <span className="font-medium">
        {number}. {text}
      </span>
      <span className="text-sm text-[#e26f4a]">→</span>
    </button>
  );
}
