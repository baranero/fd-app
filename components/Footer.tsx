import Link from "next/link"
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"

const Footer = () => {

    return (
        <nav className="w-full z-40">
            <div className="
              px-4
              md:px-3
              lg:px-16
              py-6
              flex
              flex-col
              justify-center
              items-center
              transition
              duration-500
              bg-zinc-700
              bg-opacity-40
            ">
                <p className="text-white">&#169; 2023 Jakub Baran | All rights reserved.</p>
                <div className="flex flex-row mt-3 w-full justify-center items-center">
                    <Link href="https://github.com/baranero">
                        <p className="text-white mx-2"><AiFillGithub size={30}/></p>
                    </Link>
                    <Link href="https://www.linkedin.com/in/jakub-baran-42a00522b/">
                        <p className="text-white mx-2"><AiFillLinkedin size={30}/></p>
                    </Link>
                </div>
                <div className="flex text-white flex-row mt-3 w-full justify-center items-center">
                Image by <a className="hover:text-gray-400" href="https://www.freepik.com/free-photo/top-view-desk-arrangement-with-notebook_16688666.htm#query=schedule%20draw&position=34&from_view=search&track=ais">Freepik</a>

                </div>
                
            </div>

        </nav>
    )
}

export default Footer