"use client";

import { usePathname, useRouter } from "next/navigation";
import { User, Notebook } from "lucide-react";

export default function FooterBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 w-full h-20 bg-white text-[#999] border-t border-gray-200 flex justify-center py-2 z-50">
      <button
        onClick={() => router.push("/")}
        className="flex flex-col items-center justify-between flex-1"
      >
        <Notebook
          size={isActive("/") ? 40 : 36}
          color={isActive("/") ? "#e26f4a" : "#999"}
        />
        <div className="h-6 flex items-center">
          <span
            className={`${
              isActive("/")
                ? "text-sm text-[#e26f4a] font-bold"
                : "text-xs text-[#999]"
            }`}
          >
            To-Do List
          </span>
        </div>
      </button>
      <button
        onClick={() => router.push("/you")}
        className="flex flex-col items-center flex-1"
      >
        <User size={40} color={isActive("/you") ? "#e26f4a" : "#999"} />
        <span
          className={`${
            isActive("/you")
              ? "text-sm text-[#e26f4a] font-bold"
              : "text-xs text-[#999]"
          }`}
        >
          You
        </span>
      </button>
    </nav>
  );
}
