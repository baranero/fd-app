import React, { ReactNode, useCallback, useState, useEffect } from "react";
import Navbar from "./Navbar";
import SettingsModal from "./SettingsModal";
import useSettingsModal from "@/hooks/useSettingsModal";
import { mutate } from "swr";
import Footer from "./Footer";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props: Props) => {
  const { isOpen, closeModal, openModal } = useSettingsModal();

  const handleOpenModal = useCallback(() => {
    mutate;
    openModal();
  }, [openModal]);

  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <>
      <Navbar openModal={handleOpenModal} />
      <div className="pb-10 min-h-screen">
        <SettingsModal visible={isOpen} onClose={closeModal} />

        {!pageLoading ? (
          <div className="flex flex-col justify-center items-center h-[50vh] lg:h-[90vh] md:h-[90vh] "><div className="container">
          <div className="red flame"></div>
          <div className="orange flame"></div>
          <div className="yellow flame"></div>
          <div className="white flame"></div>
          <div className="blue circle"></div>
          <div className="black circle"></div>
        </div><p className="text-white -translate-y-4 text-5xl">Loading...</p></div>
        ) : (
          <div>{props.children}</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
