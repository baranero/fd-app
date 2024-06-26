import React from "react";
import NavbarItem from "./NavbarItem";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className="bg-neutral-400
        bg-opacity-20 text-center w-full top-8 right-0 py-5 flex-col bordr-2 border-gray-800 flex"
    >
      <div className="flex flex-col gap-4">
      <Link href="/">
              <NavbarItem label="Strona Główna" />
            </Link>
            <Link href="/warehouse">
              <NavbarItem label="Dziennik" />
            </Link>
            <Link href="/products">
              <NavbarItem label="Magazyn" />
            </Link>
            <Link href="/users">
              <NavbarItem label="Użytkownicy" />
            </Link>
        <p
          className="text-white cursor-pointer hover:text-gray-300 transition z-50"
          onClick={() => signOut()}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default MobileMenu;
