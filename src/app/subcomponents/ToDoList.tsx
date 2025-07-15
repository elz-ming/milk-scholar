"use client";

import { useState } from "react";
import { Bucket_B_questions } from "@/app/data/questionBank";
import TaskItem from "./TaskItem";
import TaskEditor from "./TaskEditor"; // 👈 NEW Subcomponent

export default function ToDoList() {
  const [activeTask, setActiveTask] = useState<
    null | (typeof Bucket_B_questions)[number]
  >(null);

  const tasks = Bucket_B_questions.sort((a, b) => a.order - b.order);

  return (
    <main className="relative my-20 bg-white text-black overflow-y-auto p-4">
      <div className="flex flex-col gap-4">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.key}
            number={index + 1}
            text={task.title || task.text}
            onClick={() => setActiveTask(task)}
          />
        ))}
      </div>

      {activeTask && (
        <TaskEditor task={activeTask} onClose={() => setActiveTask(null)} />
      )}
    </main>
  );
}
