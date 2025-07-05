"use client";

import Sidebar from "./subcomponents/Sidebar";

export default function Admin() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <section className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold">1,234</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Total Projects</h2>
            <p className="text-3xl font-bold">56</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">New Messages</h2>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>
      </section>
    </main>
  );
}
