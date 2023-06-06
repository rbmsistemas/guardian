import React, { useContext, useEffect, useState } from "react";
import Side from "../sidebar/Sidebar";
import Logo from ".././../assets/img/images.jfif";
import LogoGuardian from ".././../assets/img/guardian_logo.png";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";
import Context from "../../context/Context";
import { MdAccountCircle } from "react-icons/md";

const Nav = ({ children }) => {
  const { user } = useContext(Context);

  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setShowMenu(true);
    } else setShowMenu(false);
  }, []);

  return (
    <div className="min-h-screen h-screen w-full max-h-screen overflow-hidden flex flex-col">
      <div
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
            <img src={Logo} className="h-12 hidden md:block" alt="Logo GAP" />
          </Link>
        </div>
        <img src={LogoGuardian} className="h-14" alt="Logo Guardian" />
      </div>
      <div className="flex flex-1 min-h-0">
        <div
          id="sidebar"
          className={`${
            !showMenu ? "scale-0 w-0 fixed" : "scale-100 fixed md:static"
          } origin-top-left transition duration-150 ease-in-out z-50 h-full min-h-screen overflow-y-auto md:overflow-y-visible`}
        >
          {user?.user && (
            <div className="flex justify-start items-center h-20 px-3 text-gap-primary gap-2 bg-white border-b border-gray-300">
              <span>
                <MdAccountCircle className="h-10 w-10 text-gap-primary" />
              </span>
              <div className="flex flex-col justify-center items-start">
                <p className="text-sm">
                  {user.user.firstName + " " + user.user.lastName}
                </p>
                <p className="text-xs text-gray-400">{user.user.userName}</p>
              </div>
            </div>
          )}
          <Side user={user?.user} />
        </div>
        <div id="contenido" className="flex-1 min-h-0 w-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Nav;
