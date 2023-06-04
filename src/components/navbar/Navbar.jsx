import React, { useEffect, useState } from "react";
import Side from "../sidebar/Sidebar";
import Logo from ".././../assets/img/images.jfif";
import LogoGuardian from ".././../assets/img/guardian_logo.png";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";

const Nav = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <div className="min-h-full h-full w-full max-h-screen overflow-hidden">
      <div className="bg-white flex justify-between items-center text-gray-500 h-20 px-3 gap-5 border-b border-gray-300">
        <div className="flex justify-start items-center gap-3">
          <span className="flex justify-center items-center cursor-pointer hover:scale-110 hover:bg-gap-primary hover:text-white rounded-full p-2 transition delay-75 ease-in-out">
            <CgMenu
              onClick={() => setShowMenu(!showMenu)}
              className="h-6 w-6"
            />
          </span>
          <Link to="/">
            <img src={LogoGuardian} className={`h-14`} alt="Logo GAP" />
          </Link>
        </div>
        <img src={Logo} className={`h-12 hidden md:block`} alt="Logo GAP" />
      </div>
      <div className={`flex min-h-full h-full text-gray-500 pb-0 gap-3`}>
        <div
          className={`${
            showMenu ? "scale-0 w-0 fixed" : "scale-100 fixed md:static "
          } origin-top-left transition delay-50 ease-in-out z-50 h-full min-h-screen`}
        >
          <Side />
        </div>
        <div className="min-h-full h-screen w-full overflow-y-scroll pb-44 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Nav;
