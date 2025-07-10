"use client";

import { useState } from "react";
import { Bucket_B_questions } from "@/app/data/questionBank";
import TaskItem from "./TaskItem"; // ✅ adjust path if needed!

export default function ToDoList() {
  const [tasks, setTasks] = useState(
    Bucket_B_questions.sort((a, b) => a.order - b.order).map((q) => ({
      ...q,
      completed: false,
    }))
  );

  const toggleDone = (index: number) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <main className="my-20 bg-white text-black overflow-y-auto p-4">
      <div className="flex flex-col gap-4">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.key}
            number={index + 1}
            text={task.text}
            completed={task.completed}
            onToggle={() => toggleDone(index)}
          />
        ))}
      </div>
    </main>
  );
}
