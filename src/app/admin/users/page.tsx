"use client";

import Sidebar from "../subcomponents/Sidebar";
import { USERS } from "@/app/data/userData";
import { useRouter } from "next/navigation";

export default function AdminUsers() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <section className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Users</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow table-fixed">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-3 w-12">S/N</th>
                <th className="px-4 py-3 w-20">Photo</th>
                <th className="px-4 py-3 w-40">Name</th>
                <th className="px-4 py-3 w-64">Institution</th>
                <th className="px-4 py-3 w-20">Age</th>
                <th className="px-4 py-3 w-24">Gender</th>
                <th className="px-4 py-3 w-40">Status</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((user, idx) => (
                <tr
                  key={user.id}
                  onClick={() => router.push(`/admin/users/${user.id}`)}
                  className="border-t hover:bg-gray-100 cursor-pointer text-2xl"
                  style={{ height: "72px" }}
                >
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-18 h-18 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.institution}</td>
                  <td className="px-4 py-2">{user.age}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        user.gender === "Male"
                          ? "bg-blue-100 text-blue-800"
                          : user.gender === "Female"
                          ? "bg-pink-100 text-pink-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {user.gender}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        user.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : user.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
