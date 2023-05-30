import Image from "next/image";
import NavbarItem from "./NavbarItem";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { signOut } from "next-auth/react";
import React, { useCallback, useState } from "react";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import useCurrentUser from "@/hooks/useCurrentUser";

interface NavbarProps {
  openModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ openModal }) => {
  const { data: currentUser } = useCurrentUser();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full z-40">
      <div
        className="
              px-4
              md:px-3
              lg:px-16
              py-6
              flex
              justify-between
              items-center
              transition
              duration-500
              bg-zinc-700
              bg-opacity-40
            "
      >
        <div className="flex flex-row">
          <Link href="/">
            <Image src="/images/logo.svg" alt="Logo" width={120} height={100} />
          </Link>
          <div
            className="
                        hidden
                        lg:flex
                        md:flex
                        ml-8
                        gap-7
                        "
          >
            <Link href="/">
              <NavbarItem label="Home" />
            </Link>
            <Link href="/vacations">
              <NavbarItem label="Vacations" />
            </Link>
            <Link href="/overhours">
              <NavbarItem label="Overhours" />
            </Link>
            <Link href="/users">
              <NavbarItem label="Users" />
            </Link>
          </div>
        </div>

        <div
          className="lg:hidden md:hidden flex 
                "
        >
          <IoMdSettings
            onClick={openModal}
            size={30}
            className="text-white mx-1 cursor-pointer"
          />
          <GiHamburgerMenu
            onClick={toggleMobileMenu}
            size={30}
            className={`text-white mx-2 transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div className="hidden lg:flex md:flex flex-row items-center">
          <p className="text-white mr-8 md:mr-4">Hello, {currentUser?.name}</p>
          <IoMdSettings
            onClick={openModal}
            size={30}
            className="text-white mx-1 cursor-pointer"
          />
          <BiLogOut
            onClick={() => signOut()}
            size={30}
            className="text-white mx-1 cursor-pointer"
          />
        </div>
      </div>
      <MobileMenu visible={showMobileMenu} />
    </nav>
  );
};

export default Navbar;
