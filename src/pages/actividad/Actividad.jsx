import React, { useState } from "react";
import CustomeTable from "../../components/table/CustomeTable";
import { Label, TextInput } from "flowbite-react";
import { FaHome, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";

const Actividad = () => {
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
          <span className="text-gray-500">/</span>
          <Link to="/actividad" className="text-gray-500 hover:text-gray-700">
            Actividad
          </Link>
        </div>
        <Link
          to="/actividad/crear"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
        >
          <span>
            <AiFillFileAdd className="text-white text-lg" />
          </span>
          Nueva Actividad
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
        <CustomeTable />
      </div>
    </div>
  );
};

export default Actividad;
