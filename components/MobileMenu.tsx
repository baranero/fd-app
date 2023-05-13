import React from "react";
import NavbarItem from "./NavbarItem";
import Link from "next/link";

interface MobileMenuProps {
    visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {

    if (!visible) {
        return null
    }

    return (
        <div className="bg-black text-center w-full top-8 right-0 py-5 flex-col bordr-2 border-gray-800 flex">
            <div className="flex flex-col gap-4">
                <Link href='/'>
                    <NavbarItem label="Home"/>
                </Link>
                <Link href='/vacations'>
                                <NavbarItem label="Vacations"/>
                            </Link>
                            <Link href='/overhours'>
                                <NavbarItem label="Overhours"/>
                            </Link>
                            <Link href='/users'>
                                <NavbarItem label="Users"/>
                            </Link>

            </div>
        </div>
    )
}

export default MobileMenu