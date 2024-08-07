import Link from "next/link";
import { ReactNode } from "react";

type MenuItemProps = {
  href: string;
  children: ReactNode;
  onClick?: () => void;
};

export default function MenuItem({ href, onClick, children }: MenuItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="block px-4 py-2 hover:bg-gray-700"
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
}
