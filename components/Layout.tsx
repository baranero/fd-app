import React, { ReactNode, useCallback } from "react";
import Navbar from "./Navbar";
import SettingsModal from "./SettingsModal";
import useSettingsModal from "@/hooks/useSettingsModal";
import { mutate } from "swr";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { isOpen, closeModal, openModal } = useSettingsModal()

  const handleOpenModal = useCallback(() => {
    mutate
    openModal()
}, [openModal])
  return (
    <div className="pb-10 min-h-screen" >
        <Navbar openModal={handleOpenModal}/>
        <SettingsModal visible={isOpen} onClose={closeModal} />
        <>{props.children}</>
    </div>
  )
}



export default Layout