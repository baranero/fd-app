import React from "react";

interface MobileMenuProps {
    visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {

    if (!visible) {
        return null
    }

    return (
        <div className="bg-black w-full top-8 right-0 py-5 flex-col bordr-2 border-gray-800 flex">
            <div className="flex flex-col gap-4">
                <div className="px-3 text-center text-white cursor-pointer hover:underline">Home</div>
                <div className="px-3 text-center text-white cursor-pointer hover:underline">Vacations</div>
                <div className="px-3 text-center text-white cursor-pointer hover:underline">Overhours</div>
            </div>
        </div>
    )
}

export default MobileMenu