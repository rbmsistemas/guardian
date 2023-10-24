import React, { useContext, useEffect, useState, useRef, lazy } from "react";
const Side = lazy(() => import("../sidebar/Sidebar"));
import Logo from ".././../assets/img/gap.png";
import LogoGuardian from ".././../assets/logo/sinabe.png";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";
import Context from "../../context/Context";
import { TbSquareArrowLeftFilled } from "react-icons/tb";
import Searcher from "../searcher/Searcher";

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
  }, [window.location.pathname, window.innerWidth]);

  return (
    <div className="relative h-screen w-full min-h-full flex overflow-x-hidden">
      <div
        ref={navRef}
        id="sidebar"
        className={`bg-black/50 fixed z-50 ${
          !showMenu ? "scale-0 w-0" : "scale-100 w-full md:w-[280px]"
        } origin-top-left transition-all duration-150 ease-in-out h-screen overflow-y-hidden`}
      >
        <div className="bg-purple-900 relative max-h-screen h-screen w-[280px]">
          <div className="absolute z-50 top-10 -right-3 md:hidden">
            <TbSquareArrowLeftFilled
              onClick={() => setShowMenu(!showMenu)}
              className="text-white text-4xl cursor-pointer"
            />
          </div>
          <Side user={user?.user} />
        </div>
      </div>
      <div
        className={`flex h-full w-full ${
          showMenu && "md:pl-[280px]"
        } transition-all duration-150 ease-in-out`}
      >
        <div
          ref={menuButtonRef}
          id="navbar"
          className={`bg-white fixed w-full ${
            showMenu && "md:w-[calc(100vw-280px)]"
          } z-40 h-[70px] flex justify-between items-center text-gray-500 px-3 gap-5 border-b border-gray-300`}
        >
          <div className="flex justify-start items-center gap-3">
            <span
              onClick={() => setShowMenu(!showMenu)}
              className="flex justify-center items-center cursor-pointer hover:scale-110 hover:bg-purple-700 hover:text-white rounded-full p-2 transition duration-150 ease-in-out"
            >
              <CgMenu className="h-6 w-6" />
            </span>
            <Link className="w-auto" to="/">
              <img src={Logo} className="h-10 hidden md:block" alt="Logo GAP" />
            </Link>
            {user?.user?.id && (
              <div className="w-[35vw] md:pl-14">
                <Searcher />
              </div>
            )}
          </div>
          <img src={LogoGuardian} className="h-10" alt="Logo Guardian" />
        </div>
        <div
          id="contenido"
          className="flex mt-[70px] w-full h-[calc(100vh-70px)] overflow-hidden bg-neutral-200/50"
        >
          <div className="w-full h-full overflow-y-auto py-3 gap-5 flex flex-col justify-start items-start">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
