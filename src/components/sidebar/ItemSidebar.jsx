import React, { useState, useEffect, useRef } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router";

const ItemSidebar = ({
  name,
  href,
  onClick,
  disabled,
  allowedRoles,
  userRol,
  icon: Icon,
  dropmenu = [],
}) => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
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

  const handleClick = (to) => {
    if (onClick) {
      onClick();
    } else {
      navigate(to);
    }
  };

  let isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`$'{href}/'`) ||
    pathname?.includes(`$'{href}/'`);

  dropmenu.forEach((item) => {
    if (pathname === item.href) {
      isActive = true;
    }
  });

  if (allowedRoles.length === 0) {
    return (
      <div
        onClick={() => handleClick(href)}
        className={`relative w-full px-6 py-2 md:py3 xl:py-4 ${
          disabled
            ? "text-purple-900"
            : "cursor-pointer hover:bg-white text-white hover:text-purple-700"
        } ${
          isActive && "bg-purple-700 border-r-4 border-red-500"
        } transition ease-in-out duration-100 w-full flex justify-start gap-4 items-center text-base font-semibold`}
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
    <div className="w-full flex flex-col" ref={dropdownRef}>
      <div className="relative">
        <div
          onClick={() => handleClick(href)}
          className={`px-6 py-3 text-white hover:text-purple-700 ${
            disabled ? "text-purple-900" : "cursor-pointer hover:bg-white  "
          } ${
            isActive && "bg-purple-700 border-r-4 border-red-500"
          } transition ease-in-out duration-100 w-full flex justify-start gap-4 items-center text-base font-semibold`}
        >
          <span className="text-2xl">
            <Icon />
          </span>
          <p>{name}</p>
        </div>
        {dropmenu.length > 0 && (
          <MdOutlineKeyboardArrowDown
            onClick={handleDropMenu}
            className="absolute rounded-md z-20 top-1 right-0 h-6 w-6 m-2 text-neutral-300 hover:text-purple-700 hover:bg-white cursor-pointer"
          />
        )}
      </div>
      {showDropMenu && (
        <div className="bg-purple-800">
          {dropmenu.map((item) => (
            <div
              key={item.name}
              onClick={() => handleClick(item.href)}
              className="px-6 py-3 hover:bg-white text-white hover:text-purple-800 transition ease-in-out duration-200 flex justify-start gap-4 items-center text-base font-semibold cursor-pointer"
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
