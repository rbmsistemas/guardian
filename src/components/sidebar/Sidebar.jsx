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
  return (
    <div className={`h-full min-h-screen w-fit bg-white`}>
      <Sidebar aria-label="Sidebar menu">
        <Sidebar.Items>
          {user.firstName && (
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/" icon={MdDashboard}>
                <p>Dashboard</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="/inventario"
                icon={MdOutlineInventory2}
                label=""
                labelColor="dark"
              >
                <p>Inventarios</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="/inventario"
                icon={TbReportSearch}
                label=""
                labelColor="dark"
              >
                <p>Reportes</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="/actividades"
                icon={MdGavel}
                label=""
                labelColor="dark"
              >
                <p>Actividades</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="/inventario"
                icon={MdLan}
                label=""
                labelColor="dark"
              >
                <p>Proveedores</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="/inventario"
                icon={FaUsers}
                label=""
                labelColor="dark"
              >
                <p>Usuarios</p>
              </Sidebar.Item>
              <Sidebar.Item icon={AiOutlineLogout}>
                <p>Cerrar sesión</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          )}
          {!user.firstName && (
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/login" icon={MdAccountCircle}>
                <p>Iniciar sesión</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          )}
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/login" icon={MdSupport}>
              <p>Ayuda</p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default Side;
