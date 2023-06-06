import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import EditarProveedores from "./EditarProveedores";
import CrearProveedores from "./CrearProveedores";

const ProveedoresForm = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    if (id) console.log(id);
  }, [id]);

  return (
    <div className="min-h-full h-auto w-full p-5">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <FaHome className="text-xl" />
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="/proveedores" className="text-gray-500 hover:text-gray-700">
            Proveedores
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="#" className="text-gray-500 hover:text-gray-700">
            Nuevo proveedor
          </Link>
        </div>
        <Link
          to="/proveedores"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
        >
          <span>
            <IoArrowBack className="text-white text-lg" />
          </span>
          Cancelar
        </Link>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold"></h2>
        <form className="flex flex-col gap-5 mt-5 bg-white p-3 rounded-lg">
          {id ? <EditarProveedores data={data} /> : <CrearProveedores />}
        </form>
      </div>
    </div>
  );
};

export default ProveedoresForm;
