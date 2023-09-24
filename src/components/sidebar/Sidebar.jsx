import { Sidebar } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import {
  MdAccountCircle,
  MdDashboard,
  MdGavel,
  MdLan,
  MdOutlineInventory2,
  MdOutlineKeyboardArrowDown,
  MdSupport,
} from "react-icons/md";
import { Tb3DCubeSphere, TbReportSearch } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../context/Context";

const Side = ({
  user = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    photo: "",
    createdAt: "",
    updatedAt: "",
  },
}) => {
  const { postSignout } = useContext(Context);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const navigate = useNavigate();
  const closeSession = () => {
    postSignout();
    navigate("/");
  };

  const handleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <div className={`h-full min-h-screen bg-white w-full`}>
      <Sidebar aria-label="Sidebar menu">
        <Sidebar.Items>
          {user.firstName && (
            <Sidebar.ItemGroup>
              <Link
                to="/"
                className="p-3 py-2 hover:bg-gray-100 text-purple-600 hover:text-purple-800 transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
              >
                <span className="text-2xl">
                  <MdDashboard />
                </span>
                <p>Dashboard</p>
              </Link>
              <div className="w-full h-full relative">
                <Link
                  to="/inventario"
                  className="p-3 py-2 hover:bg-gray-100 text-purple-600 hover:text-purple-800 transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
                >
                  <span className="text-2xl">
                    <MdOutlineInventory2 />
                  </span>
                  <p>Inventarios</p>
                </Link>
                <MdOutlineKeyboardArrowDown
                  size={24}
                  onClick={handleSubmenu}
                  className={`absolute right-2 top-1/2 text-purple-600 hover:text-purple-800 transform -translate-y-1/2 hover:bg-neutral-200 rounded-md cursor-pointer ${
                    showSubmenu && "rotate-180 transform"
                  }}`}
                />
              </div>
              {showSubmenu && (
                <Link
                  to="/modelos"
                  className="p-3 py-2 shadow-[inset_0px_12px_15px_-10px_rgba(126,58,254,0.5)] border border-purple-100 border-t-0 hover:bg-purple-300 text-purple-600 hover:text-purple-800 transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
                >
                  <span className="text-2xl">
                    <Tb3DCubeSphere />
                  </span>
                  <p>Modelos</p>
                </Link>
              )}
              <Link
                to="/inventario"
                className="p-3 py-2 hover:bg-gray-100 text-purple-600 hover:text-purple-800 transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
              >
                <span className="text-2xl">
                  <TbReportSearch />
                </span>
                <p>Reportes</p>
              </Link>
              <Link
                to="/actividades"
                className="p-3 py-2 hover:bg-gray-100 text-purple-600 hover:text-purple-800 transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
              >
                <span className="text-2xl">
                  <MdGavel />
                </span>
                <p>Actividades</p>
              </Link>
              <Link
                to="/companies"
                className="p-3 py-2 hover:bg-gray-100 text-purple-600 hover:text-purple-800 transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
              >
                <span className="text-2xl">
                  <MdLan />
                </span>
                <p>Compañias</p>
              </Link>
              <Link
                to="/"
                className="p-3 py-2 hover:bg-gray-100 text-purple-600 hover:text-purple-800 transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
              >
                <span className="text-2xl">
                  <FaUsers />
                </span>
                <p>Usuarios</p>
              </Link>
              <div onClick={() => closeSession()}>
                <Link
                  to={"/login"}
                  className="p-3 py-2 hover:bg-gray-100 text-purple-600 hover:text-purple-800 transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
                >
                  <span className="text-2xl">
                    <AiOutlineLogout />
                  </span>
                  <p>Cerrar sesión</p>
                </Link>
              </div>
            </Sidebar.ItemGroup>
          )}
          {!user.firstName && (
            <Sidebar.ItemGroup>
              <Link
                to="/login"
                className="p-3 py-2 hover:bg-gray-100 text-purple-600 hover:text-purple-800 transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
              >
                <span className="text-2xl">
                  <MdAccountCircle />
                </span>
                <p>Iniciar Sesión</p>
              </Link>
            </Sidebar.ItemGroup>
          )}
          <Sidebar.ItemGroup>
            <Link
              to="/actividades"
              className="p-3 py-2 hover:bg-gray-100 text-purple-600 hover:text-purple-800 transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
            >
              <span className="text-2xl">
                <MdSupport />
              </span>
              <p>Ayuda</p>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default Side;
