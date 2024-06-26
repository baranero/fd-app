import React from "react";

interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <div className="cursor-pointer hover:text-gray-300 transition z-50">
      {label}
    </div>
  );
};

export default NavbarItem;
