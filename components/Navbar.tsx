import Image from "next/image"
import NavbarItem from "./NavbarItem"

const Navbar = () => {
    return (
        <nav className="w-full fixed z-40">
            <div className="
              px-4
              md:px-16
              py-6
              flex
              flex-row
              items-center
              transition
              duration-500
              bg-black
            ">
                <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                <div className="
                    flex
                    ml-8
                    gap-7
                    ">
                        <NavbarItem label="Home"/>
                        <NavbarItem label="Vacations"/>
                        <NavbarItem label="Overhours"/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar