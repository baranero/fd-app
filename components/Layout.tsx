import React, { ReactNode, useCallback, useState, useEffect } from "react";
import Navbar from "./Navbar";
import SettingsModal from "./SettingsModal";
import useSettingsModal from "@/hooks/useSettingsModal";
import { mutate } from "swr";
import Footer from "./Footer";
import { useRouter } from "next/router";
import LoadingFlame from "./LoadingFlame";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => {
  const { isOpen, closeModal, openModal } = useSettingsModal();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  const handleOpenModal = useCallback(() => {
    mutate;
    openModal();
  }, [openModal]);

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

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      <Navbar openModal={handleOpenModal} />
      <div className="pb-10">
        <SettingsModal visible={isOpen} onClose={closeModal} />

        {pageLoading ? <LoadingFlame/> : (
          <div>{children}</div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
