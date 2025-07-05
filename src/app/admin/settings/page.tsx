"use client";

import Sidebar from "../subcomponents/Sidebar";

export default function AdminSettings() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <section className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
        <p className="text-lg">
          This is the settings page for admin configuration.
        </p>
      </section>
    </main>
  );
}
