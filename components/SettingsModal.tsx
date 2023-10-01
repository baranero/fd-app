import React, { useCallback, useEffect, useState } from "react";
import useRegisteredUsers from "@/hooks/useRegisteredUsers";
import useCurrentUser from "@/hooks/useCurrentUser";
import ModalHeader from "./ModalHeader";
import ModalAdminPermissionsForm from "./ModalAdminPermissionsForm";
import ModalPasswordChangeForm from "./ModalPasswordChangeForm";

interface SettingsModalProps {
  visible?: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
  const { data: registeredUsers = [] } = useRegisteredUsers();
  const { data: currentUser = [], mutate } = useCurrentUser();

  const [isVisible, setIsVisible] = useState(!!visible);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="
                z-50
                transition
                duration-300
                bg-black
                bg-opacity-80
                flex
                justify-center
                items-center
                overflow-x-hidden
                overflow-y-auto
                fixed
                inset-0
                w-full
            "
    >
      <div
        className="
                    relative
                    mx-auto
                    w-full
                    lg:w-[70%]
                    rounded-md
                    overflow-hidden
                "
      >
        <div
          className={`
                    ${isVisible ? "scale-80" : "scale-0"}
                    transform
                    duration-300
                    relative
                    flex-auto
                    bg-zinc-900
                    drop-shadow-md
                `}
        >
          <ModalHeader onClose={handleClose} />
          {currentUser?.isAdmin === "true" ? (
            <ModalAdminPermissionsForm
              registeredUsers={registeredUsers}
              mutate={mutate}
            />
          ) : (
            <></>
          )}
          <ModalPasswordChangeForm mutate={mutate} />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
