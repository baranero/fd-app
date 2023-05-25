import React, { ReactNode, useCallback } from "react";
import Navbar from "./Navbar";
import SettingsModal from "./SettingsModal";
import useSettingsModal from "@/hooks/useSettingsModal";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { isOpen, closeModal, openModal } = useSettingsModal()

  const handleOpenModal = useCallback(() => {
    openModal()
}, [openModal])
  return (
    <div className="pb-10" >
        <Navbar openModal={handleOpenModal}/>
        <SettingsModal visible={isOpen} onClose={closeModal} />
        <>{props.children}</>
    </div>
  )
}



export default Layout