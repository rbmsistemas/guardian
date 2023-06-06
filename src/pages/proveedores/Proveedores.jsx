import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { AiFillFileAdd } from "react-icons/ai";
import CustomeTable from "../../components/table/CustomeTable";
import { Label, TextInput } from "flowbite-react";

const Proveedores = () => {
  const [filters, setFilters] = useState({
    searchs: "",
  });
  return (
    <div className="min-h-full w-full p-5">
      <div className="flex flex-col md:flex-row justify-between items-center pb-2">
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
        </div>
        <Link
          to="/proveedores/crear"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
        >
          <span>
            <AiFillFileAdd className="text-white text-lg" />
          </span>
          Nuevo Proveedor
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2">
            <div className="w-full">
              <Label htmlFor="search" value="Buscar" />
            </div>
            <TextInput
              id="search"
              type="text"
              icon={FaSearch}
              placeholder="Actividad, Nombre, Compañia, etc."
              required={true}
              value={filters.searchs}
              onChange={(e) =>
                setFilters({ ...filters, searchs: e.target.value })
              }
            />
          </div>
        </div>
        <CustomeTable data={Providers} />
      </div>
    </div>
  );
};

export default Proveedores;

const Providers = [
  {
    id: 1,
    proveedor: "Compañia 1",
    encargado: "Encargado 1",
    teléfono: "1234567890",
    "correo electronico": "proveedores@gmail.com",
    dirección: "Calle 1 # 1 - 1",
  },
  {
    id: 2,
    proveedor: "Compañia 2",
    encargado: "Encargado 2",
    teléfono: "1234567890",
    "correo electronico": "proveedores2@gmail.com",
    dirección: "Calle 2 # 2 - 2",
  },
];
