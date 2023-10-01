import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalHeaderProps {
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose }) => {
  return (
    <div className="relative h-12">
      <div
        className="
          cursor-pointer
          absolute
          top-3
          right-3
          h-10
          w-10
          rounded-full
          bg-black
          bg-opacity-70
          flex
          items-center
          justify-center
        "
        onClick={onClose}
      >
        <AiOutlineClose className="text-white" size={20} />
      </div>
    </div>
  );
};

export default ModalHeader;
