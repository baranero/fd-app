import Image from "next/image"
import NavbarItem from "./NavbarItem"
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiLogOut } from 'react-icons/bi'
import { IoMdSettings } from 'react-icons/io'
import { signOut } from 'next-auth/react'
import { useCallback, useState } from "react"
import MobileMenu from "./MobileMenu"
import Link from 'next/link';

const TOP_OFFSET = 66

const Navbar = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    return (
        <nav className="w-full z-40">
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
                
                    
                <div className="lg:hidden md:hidden
                ">
                    <GiHamburgerMenu onClick={toggleMobileMenu} size={30} className={`text-white mx-4 transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                    
                </div>
                <div className="hidden lg:flex md:flex flex-row">
                    <IoMdSettings size={30} className="text-white mx-1 cursor-pointer"/>
                    <BiLogOut onClick={() => signOut()} size={30} className="text-white mx-1 cursor-pointer"/>
                </div>
            </div>
            <MobileMenu visible={showMobileMenu}/>
        </nav>
    )
}

export default Navbar