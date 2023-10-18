import React, { useContext, useEffect, useState, useRef, lazy } from "react";
const Side = lazy(() => import("../sidebar/Sidebar"));
import Logo from ".././../assets/img/gap.png";
import LogoGuardian from ".././../assets/logo/sinabe.png";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";
import Context from "../../context/Context";

const Nav = ({ children }) => {
  const { user } = useContext(Context);

  const [showMenu, setShowMenu] = useState(true);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
      const handleClickOutside = (event) => {
        if (
          navRef.current &&
          menuButtonRef.current &&
          !navRef.current.contains(event.target) &&
          !menuButtonRef.current.contains(event.target)
        ) {
          setShowMenu(false);
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [window.innerWidth]);

  return (
    <div className="h-screen w-full min-h-full flex overflow-x-hidden">
      <div
        ref={navRef}
        id="sidebar"
        className={`bg-purple-900 fixed z-50 ${
          !showMenu ? "scale-0 w-0" : "scale-100 md:w-[280px] pt-[70px] md:pt-0"
        } origin-top-left transition-all duration-150 ease-in-out h-full overflow-y-hidden`}
      >
        <Side user={user?.user} />
      </div>
      <div className={`flex h-full w-full ${showMenu && "md:pl-[280px]"}`}>
        <div
          ref={menuButtonRef}
          id="navbar"
          className="bg-white fixed w-full z-50 h-[70px] flex justify-between items-center text-gray-500 px-3 gap-5 border-b border-gray-300"
        >
          <div className="flex justify-start items-center gap-3">
            <span
              onClick={() => setShowMenu(!showMenu)}
              className="flex justify-center items-center cursor-pointer hover:scale-110 hover:bg-purple-700 hover:text-white rounded-full p-2 transition duration-150 ease-in-out"
            >
              <CgMenu className="h-6 w-6" />
            </span>
            <Link to="/">
              <img src={Logo} className="h-10 hidden md:block" alt="Logo GAP" />
            </Link>
          </div>
          <img src={LogoGuardian} className="h-10" alt="Logo Guardian" />
        </div>
        <div
          id="contenido"
          className="flex h-full pt-[70px] w-full overflow-y-auto bg-neutral-200/50"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Nav;
