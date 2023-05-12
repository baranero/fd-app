import Image from "next/image"
import NavbarItem from "./NavbarItem"
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiLogOut } from 'react-icons/bi'
import { IoMdSettings } from 'react-icons/io'
import { signOut } from 'next-auth/react'

const Navbar = () => {
    return (
        <nav className="w-full fixed z-40">
            <div className="
              px-4
              md:px-16
              py-6
              flex
              justify-between
              items-center
              transition
              duration-500
              bg-black
            ">
                <div className="flex flex-row">
                    
                    <Image
                            src="/images/logo.svg"
                            alt="Logo"
                            width={120}
                            height={100}
                        />
                    <div className="
                        hidden
                        lg:flex
                        md:flex
                        ml-8
                        gap-7
                        ">
                            <NavbarItem label="Home"/>
                            <NavbarItem label="Vacations"/>
                            <NavbarItem label="Overhours"/>
                    </div>
                </div>
                
                    
                <div className="lg:hidden md:hidden
                ">
                    <GiHamburgerMenu size={30} className="text-white mx-4"/>
                </div>
                <div className="hidden lg:flex md:flex flex-row">
                    <IoMdSettings size={30} className="text-white mx-1 cursor-pointer"/>
                    <BiLogOut onClick={() => signOut()} size={30} className="text-white mx-1 cursor-pointer"/>
                </div>
            </div>

        </nav>
    )
}

export default Navbar