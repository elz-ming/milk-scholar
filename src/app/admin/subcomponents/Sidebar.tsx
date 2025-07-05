"use client";

import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Admin</h2>
      <nav className="flex flex-col gap-2">
        <SidebarItem label="Dashboard" href="/admin" />
        <SidebarItem label="Users" href="/admin/users" />
        <SidebarItem label="Settings" href="/admin/settings" />
      </nav>
    </aside>
  );
}
