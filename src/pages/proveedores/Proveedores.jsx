import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { AiFillFileAdd, AiOutlinePoweroff } from "react-icons/ai";
import CustomeTable from "../../components/table/CustomeTable";
import { Label, Select, TextInput } from "flowbite-react";
import Context from "../../context/Context";

const Proveedores = () => {
  const { providers } = useContext(Context);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    searchs: "",
    status: "",
  });

  const Proveedores = providers?.map((provider) => {
    return {
      id: provider.id,
      proveedor: provider.proveedor,
      encargado: provider.encargado,
      teléfono: provider.phone,
      "correo electronico": provider.email,
      dirección: provider.address,
    };
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
              <Label htmlFor="status" value="Estado" />
            </div>
            <Select
              icon={AiOutlinePoweroff}
              id="status"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">Todos</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </Select>
          </div>
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2">
            <div className="w-full">
              <Label htmlFor="search" value="Buscar" />
            </div>
            <TextInput
              id="search"
              type="text"
              icon={FaSearch}
              placeholder="Proveedor, Nombre, teléfono,"
              required={true}
              value={filters.searchs}
              onChange={(e) =>
                setFilters({ ...filters, searchs: e.target.value })
              }
            />
          </div>
        </div>
        <CustomeTable
          showId={false}
          data={Proveedores}
          onShow={(id) => console.log(id)}
          onEdit={(id) => navigate(`/proveedores/editar/${id}`)}
          onDelete={(id) => console.log(id)}
        />
      </div>
    </div>
  );
};

export default Proveedores;
