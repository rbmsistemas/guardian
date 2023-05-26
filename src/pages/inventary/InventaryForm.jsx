import { Breadcrumb } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import CreateInventario from "./CreateInventario";
import EditarInventario from "./EditarInventario";

const InventaryForm = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    if (id) console.log(id);
  }, [id]);

  return (
    <div className="min-h-full h-auto w-full p-5 pt-20">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center pb-5">
        <Breadcrumb
          aria-label="Solid background breadcrumb example"
          className=" py-3 px-5 dark:bg-gray-900"
        >
          <Breadcrumb.Item href="/" icon={FaHome}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/inventario">Inventario</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Nuevo inventario</Breadcrumb.Item>
        </Breadcrumb>
        <Link
          to="/inventario"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
        >
          <span>
            <IoArrowBack className="text-white text-lg" />
          </span>
          Cancelar
        </Link>
      </div>
      <div className="flex flex-col p-5 pt-0">
        <h2 className="text-xl font-bold"></h2>
        <form className="flex flex-col gap-5 mt-5">
          {id ? <EditarInventario data={data} /> : <CreateInventario />}
        </form>
      </div>
    </div>
  );
};

export default InventaryForm;
