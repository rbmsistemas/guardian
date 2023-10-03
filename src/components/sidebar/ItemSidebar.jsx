import React, { useState, useEffect, useRef } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const ItemSidebar = ({
  name,
  onClick,
  disabled,
  allowedRoles,
  userRol,
  icon: Icon,
  dropmenu = [],
}) => {
  const [showDropMenu, setShowDropMenu] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropMenu = () => {
    setShowDropMenu(!showDropMenu);
  };

  const closeMenu = () => {
    setShowDropMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (allowedRoles.length === 0) {
    return (
      <div
        onClick={onClick}
        className={`relative w-full p-3 py-2 ${
          disabled
            ? "text-purple-900"
            : "cursor-pointer hover:bg-white text-white hover:text-purple-700"
        } transition ease-in-out duration-100 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg`}
      >
        <span className="text-2xl">
          <Icon />
        </span>
        <p>{name}</p>
      </div>
    );
  }

  const shouldRenderItem = allowedRoles.includes(userRol);

  return shouldRenderItem ? (
    <div className="w-full flex flex-col gap-2" ref={dropdownRef}>
      <div className={`relative`}>
        <div
          onClick={onClick}
          className={`p-3 py-2 text-white hover:text-purple-700 ${
            disabled ? "text-purple-900" : "cursor-pointer hover:bg-white  "
          } transition ease-in-out duration-100 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg`}
        >
          <span className="text-2xl">
            <Icon />
          </span>
          <p>{name}</p>
        </div>
        {dropmenu.length > 0 && (
          <MdOutlineKeyboardArrowDown
            onClick={handleDropMenu}
            className="absolute z-20 top-0 right-0 h-6 w-6 m-2 text-neutral-300 hover:text-purple-700 hover:bg-neutral-200 rounded-md cursor-pointer"
          />
        )}
      </div>
      {showDropMenu && (
        <div className="bg-purple-800 rounded-b-lg">
          {dropmenu.map((item) => (
            <div
              key={item.name}
              onClick={item.onClick}
              className="p-3 py-2 hover:bg-white text-white hover:text-purple-800 transition ease-in-out duration-200 flex justify-start gap-4 items-center text-base font-semibold last:rounded-b-lg cursor-pointer  "
            >
              <span className="text-2xl">
                <item.icon />
              </span>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : null;
};

export default ItemSidebar;
