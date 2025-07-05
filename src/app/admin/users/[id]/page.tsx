"use client";

import { USERS } from "@/app/data/userData";
import Sidebar from "../../subcomponents/Sidebar";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: { id: string };
};

export default function UserProfile({ params }: Props) {
  const userId = parseInt(params.id, 10);
  const user = USERS.find((u) => u.id === userId);

  if (!user) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <section className="flex-1 p-8 bg-gray-100">
        <div className="flex items-center gap-6 mb-6">
          <Image
            src={user.image}
            alt={`${user.name} profile`}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-600">{user.institution}</p>
            <p className="text-gray-600">
              {user.gender}, {user.age} years old
            </p>
            <p className="mt-2">
              <strong>Status:</strong> {user.status}
            </p>
          </div>
        </div>

        <p className="mb-2">
          <strong>LinkedIn:</strong>{" "}
          <a
            href={user.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Profile
          </a>
        </p>

        {/* Add more details or actions here */}
      </section>
    </main>
  );
}
