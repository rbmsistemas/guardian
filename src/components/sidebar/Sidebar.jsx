import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import {
  MdAccountCircle,
  MdDashboard,
  MdGavel,
  MdLan,
  MdOutlineInventory2,
  MdSupport,
} from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

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
  const closeSession = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className={`h-full min-h-screen bg-white w-full`}>
      <Sidebar aria-label="Sidebar menu">
        <Sidebar.Items>
          {user.firstName && (
            <Sidebar.ItemGroup>
              <Link
                to="/"
                className="p-3 py-2 hover:bg-gray-100 text-gray-500 hover:text-gap-primary transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
              >
                <span className="text-2xl">
                  <MdDashboard />
                </span>
                <p>Dashboard</p>
              </Link>
              <Link
                to="/inventario"
                className="p-3 py-2 hover:bg-gray-100 text-gray-500 hover:text-gap-primary transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
              >
                <span className="text-2xl">
                  <MdOutlineInventory2 />
                </span>
                <p>Inventarios</p>
              </Link>
              <Link
                to="/inventario"
                className="p-3 py-2 hover:bg-gray-100 text-gray-500 hover:text-gap-primary transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
              >
                <span className="text-2xl">
                  <TbReportSearch />
                </span>
                <p>Reportes</p>
              </Link>
              <Link
                to="/actividades"
                className="p-3 py-2 hover:bg-gray-100 text-gray-500 hover:text-gap-primary transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
              >
                <span className="text-2xl">
                  <MdGavel />
                </span>
                <p>Actividades</p>
              </Link>
              <Link
                to="/proveedores"
                className="p-3 py-2 hover:bg-gray-100 text-gray-500 hover:text-gap-primary transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
              >
                <span className="text-2xl">
                  <MdLan />
                </span>
                <p>Proveedores</p>
              </Link>
              <Link
                to="/"
                className="p-3 py-2 hover:bg-gray-100 text-gray-500 hover:text-gap-primary transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
              >
                <span className="text-2xl">
                  <FaUsers />
                </span>
                <p>Usuarios</p>
              </Link>
              <div onClick={() => closeSession()}>
                <Link
                  to={"/login"}
                  className="p-3 py-2 hover:bg-gray-100 text-gray-500 hover:text-gap-primary transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
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
                className="p-3 py-2 hover:bg-gray-100 text-gray-500 hover:text-gap-primary transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
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
              to="/"
              className="p-3 py-2 hover:bg-gray-100 text-gray-500 hover:text-gap-primary transition ease-in-out duration-200 w-full flex justify-start gap-4 items-center text-base font-semibold rounded-lg"
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
