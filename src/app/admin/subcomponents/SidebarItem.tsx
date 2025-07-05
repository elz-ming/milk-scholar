"use client";

export type SidebarItemProps = {
  label: string;
  href: string;
};

export default function SidebarItem({ label, href }: SidebarItemProps) {
  return (
    <a
      href={href}
      className="block px-4 py-2 rounded hover:bg-gray-700 hover:text-white"
    >
      {label}
    </a>
  );
}
