import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BiHelpCircle } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import {
  MdAccountCircle,
  MdDashboard,
  MdOutlineInventory2,
} from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

const Side = () => {
  return (
    <div className={`h-full min-h-screen w-fit bg-white`}>
      <Sidebar aria-label="Sidebar menu">
        <Sidebar.Items>
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
              href="/inventario"
              icon={FaUsers}
              label=""
              labelColor="dark"
            >
              <p>Usuarios</p>
            </Sidebar.Item>
            <Sidebar.Item href="/login" icon={MdAccountCircle}>
              <p>Iniciar sesión</p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/login" icon={BiHelpCircle}>
              <p>Ayuda</p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default Side;
