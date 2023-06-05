import Link from "next/link";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <nav className="w-full z-40">
      <div
        className="
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
            "
      >
        <p className="text-white">
          2023 Jakub Baran
        </p>
        <div className="flex flex-row mt-3 w-full justify-center items-center">
          <Link href="https://github.com/baranero">
            <p className="text-white mx-2">
              <AiFillGithub  className="hover:opacity-60" size={30} />
            </p>
          </Link>
          <Link href="https://www.linkedin.com/in/jakub-baran-42a00522b/">
            <p className="text-white mx-2">
              <AiFillLinkedin className="hover:opacity-60" size={30} />
            </p>
          </Link>
        </div>
        <div className="flex text-white text-sm text-center flex-row mt-3 w-full justify-center items-center">
          
          <a
            className="hover:opacity-60"
            href="https://www.freepik.com/free-photo/top-view-desk-arrangement-with-notebook_16688666.htm#query=schedule%20draw&position=34&from_view=search&track=ais"
          >Image by Freepik
          </a>{" "}
          &nbsp;&nbsp;| &nbsp;{" "}
          <a className="hover:opacity-60" href="https://www.pexels.com/pl-pl/zdjecie/czarny-niebieski-i-czerwony-wykres-ilustracja-186461/">
            {" "}
            Image added by Burak The Weekender
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
