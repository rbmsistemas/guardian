import React, { useContext, useEffect, useState, useRef, lazy } from "react";
const Side = lazy(() => import("../sidebar/Sidebar"));
import Logo from ".././../assets/img/gap.png";
import LogoGuardian from ".././../assets/logo/sinabe.png";
import Sinabe_icon from ".././../assets/logo/sinabe_icon.png";
import Gap_Icon from ".././../assets/img/gap_icon.png";
import { CgMenu } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import { TbSquareArrowLeftFilled } from "react-icons/tb";
import Searcher from "../searcher/Searcher";
import { MdAdd } from "react-icons/md";
const pride = "/src/assets/img/pride.jpg";

const Nav = ({ children }) => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(true);
  const [imProud, setImProud] = useState(
    localStorage.getItem("pride") === "/pride" ? true : false
  );
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

  useEffect(() => {
    if (location.pathname.includes("pride")) {
      localStorage.setItem("pride", location.pathname);
      setImProud(true);
      navigate("/");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="relative w-full min-h-[100dvh] flex overflow-x-hidden">
      <div
        ref={navRef}
        id="sidebar"
        className={`bg-black/50 fixed z-50 ${
          !showMenu ? "scale-0 w-0" : "scale-100 w-full md:w-[280px]"
        } origin-top-left transition-all duration-150 ease-in-out h-screen overflow-y-hidden`}
      >
        <div
          style={{
            backgroundImage: `url(${imProud ? pride : ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className={`${
            imProud ? "bg-none" : "bg-purple-900"
          } relative max-h-screen h-screen w-[280px]`}
        >
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
            <Link className="min-w-fit" to="/">
              <img
                src={Logo}
                className="h-10 object-cover hidden md:block"
                alt="Logo GAP"
              />
            </Link>
            {user?.user?.id && (
              <>
                <div className="md:w-[35vw] pl-2">
                  <Searcher />
                </div>
                <div
                  onClick={() => {
                    navigate("/inventario/crear");
                  }}
                  className="flex justify-center items-center gap-1 p-2 h-10 w-10 md:w-auto md:min-w-10 border border-neutral-500 text-neutral-500 hover:border-white hover:text-white hover:bg-blue-600 rounded-full cursor-pointer transition ease-in-out duration-100"
                >
                  <span>
                    <MdAdd className="text-3xl md:text-2xl" />
                  </span>
                  <p className="text-sm hidden xl:block font-semibold  whitespace-nowrap">
                    Nuevo Inventario
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end items-center gap-2">
            <img src={Gap_Icon} className="h-10 md:hidden" alt="Logo GAP" />
            <img
              src={Sinabe_icon}
              className="h-10 object-contain md:hidden"
              alt="Logo Guardian"
            />
          </div>
          <img
            src={LogoGuardian}
            className="h-10 object-contain hidden md:block"
            alt="Logo Guardian"
          />
        </div>
        <div
          id="contenido"
          className="flex pt-[70px] w-full h-[100dvh] overflow-hidden bg-stone-100"
        >
          <div
            id="children"
            className="w-full h-full overflow-y-auto gap-5 flex flex-col justify-start items-start"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
