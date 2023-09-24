import React, { useContext, useEffect, useState, useRef } from "react";
import Side from "../sidebar/Sidebar";
import Logo from ".././../assets/img/images.jfif";
import LogoGuardian from ".././../assets/logo/sinabe.png";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";
import Context from "../../context/Context";
import { MdAccountCircle } from "react-icons/md";

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
    <div className="min-h-screen h-screen w-full max-h-screen overflow-hidden flex flex-col">
      <div
        ref={menuButtonRef}
        id="navbar"
        className="sticky top-0 bg-white flex justify-between items-center text-gray-500 h-20 px-3 gap-5 border-b border-gray-300"
      >
        <div className="flex justify-start items-center gap-3">
          <span
            onClick={() => setShowMenu(!showMenu)}
            className="flex justify-center items-center cursor-pointer hover:scale-110 hover:bg-gap-primary hover:text-white rounded-full p-2 transition duration-150 ease-in-out"
          >
            <CgMenu className="h-6 w-6" />
          </span>
          <Link to="/">
            <img src={Logo} className="h-10 hidden md:block" alt="Logo GAP" />
          </Link>
        </div>
        <img src={LogoGuardian} className="h-10" alt="Logo Guardian" />
      </div>
      <div className="flex flex-1 min-h-0">
        <div
          ref={navRef}
          id="sidebar"
          className={`${
            !showMenu ? "scale-0 w-0 fixed" : "scale-100 fixed md:relative"
          } origin-top-left transition duration-150 ease-in-out z-50 h-full min-h-screen overflow-y-auto md:overflow-y-visible`}
        >
          {user?.user?.id && (
            <div className="flex justify-start items-center h-20 px-3 text-purple-600 gap-2 bg-white border-b border-gray-300">
              <span>
                <MdAccountCircle className="h-10 w-10 text-purple-600" />
              </span>
              <div className="flex flex-col justify-center items-start">
                <p className="text-sm font-bold">
                  {`${user.user.firstName} ${user.user.lastName}`.slice(0, 25)}
                </p>
                <p className="text-xs text-gray-400">
                  {`${user.user.userName}`.slice(0, 20)}
                </p>
              </div>
            </div>
          )}
          <Side user={user?.user} />
        </div>
        <div
          id="contenido"
          className="flex-1 min-h-0 w-full overflow-y-auto pb-28 md:pb-20"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Nav;
