import React, { useState } from "react";
import CustomeTable from "../../components/table/CustomeTable";
import { Breadcrumb, Label, Select, TextInput } from "flowbite-react";
import { FaHome, FaSearch } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { InventaryType, BrandType } from "../../utils/Types";
import { MdNewReleases, MdOutlineCategory } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";

const Inventario = () => {
  const [filters, setFilters] = useState({
    inventaryType: "",
    searchs: "",
    brandType: "",
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
          <Link to="/Inventario" className="text-gray-500 hover:text-gray-700">
            Inventario
          </Link>
        </div>
        <Link
          to="/inventario/crear"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
        >
          <span>
            <AiFillFileAdd className="text-white text-lg" />
          </span>
          Nuevo inventario
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 md:col-span-1 flex flex-col gap-2">
            <div className="w-full">
              <Label
                htmlFor="inventaryType"
                value="Tipo de inventario"
                className="font-bold"
              />
            </div>
            <Select
              id="inventaryType"
              icon={MdOutlineCategory}
              required={true}
              value={filters.inventaryType}
              onChange={(e) =>
                setFilters({ ...filters, inventaryType: e.target.value })
              }
            >
              <option value="">Todos</option>
              {InventaryType.map((item) => {
                return (
                  <option key={item.clave} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
              <option value="otro">Otro</option>
            </Select>
          </div>
          <div className="col-span-4 md:col-span-1 flex flex-col gap-2">
            <div className="w-full">
              <Label
                htmlFor="brandType"
                value="Selecciona la marca"
                className="font-bold"
              />
            </div>
            <Select
              id="brandType"
              icon={MdNewReleases}
              required={true}
              value={filters.brandType}
              onChange={(e) =>
                setFilters({ ...filters, brandType: e.target.value })
              }
            >
              <option value="">Todos</option>
              {BrandType.map((item) => {
                return (
                  <option key={item.clave} value={item.clave}>
                    {item.name}
                  </option>
                );
              })}
              <option value="otro">Otro</option>
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
              placeholder="Modelo, serie, activo fijo"
              required={true}
              value={filters.searchs}
              onChange={(e) =>
                setFilters({ ...filters, searchs: e.target.value })
              }
            />
          </div>
        </div>
        <CustomeTable data={FakeData} />
      </div>
    </div>
  );
};

export default Inventario;

export const FakeData = [
  {
    id: "001",
    tipo: "Teléfono",
    marca: "CISCO",
    modelo: "CP-7821-K9",
    sn: "FCH2132A1JH",
    activo: "PVRT-M23",
    fecha: "21-05-2023",
    comentarios: "Comments",
  },
  {
    id: "002",
    tipo: "Teléfono",
    marca: "CISCO",
    modelo: "CP-7821-K9",
    sn: "FCH2132A1JH",
    activo: "PVRT-M23",
    fecha: "21-05-2023",
    comentarios: "Comments",
  },
  {
    id: "003",
    tipo: "Teléfono",
    marca: "CISCO",
    modelo: "CP-7821-K9",
    sn: "FCH2132A1JH",
    activo: "PVRT-M23",
    fecha: "21-05-2023",
    comentarios: "Comments",
  },
  {
    id: "004",
    tipo: "Teléfono",
    marca: "CISCO",
    modelo: "CP-7821-K9",
    sn: "FCH2132A1JH",
    activo: "PVRT-M23",
    fecha: "21-05-2023",
    comentarios: "Comments",
  },
  {
    id: "005",
    tipo: "Teléfono",
    marca: "CISCO",
    modelo: "CP-7821-K9",
    sn: "FCH2132A1JH",
    activo: "PVRT-M23",
    fecha: "21-05-2023",
    comentarios: "Comments",
  },
  {
    id: "006",
    tipo: "Teléfono",
    marca: "CISCO",
    modelo: "CP-7821-K9",
    sn: "FCH2132A1JH",
    activo: "PVRT-M23",
    fecha: "21-05-2023",
    comentarios: "Comments",
  },
  {
    id: "007",
    tipo: "Teléfono",
    marca: "CISCO",
    modelo: "CP-7821-K9",
    sn: "FCH2132A1JH",
    activo: "PVRT-M23",
    fecha: "21-05-2023",
    comentarios: "Comments",
  },
  {
    id: "008",
    tipo: "Teléfono",
    marca: "CISCO",
    modelo: "CP-7821-K9",
    sn: "FCH2132A1JH",
    activo: "PVRT-M23",
    fecha: "21-05-2023",
    comentarios: "Comments",
  },
  {
    id: "009",
    tipo: "Teléfono",
    marca: "CISCO",
    modelo: "CP-7821-K9",
    sn: "FCH2132A1JH",
    activo: "PVRT-M23",
    fecha: "21-05-2023",
    comentarios: "Comments",
  },
  {
    id: "010",
    tipo: "Teléfono",
    marca: "CISCO",
    modelo: "CP-7821-K9",
    sn: "FCH2132A2JH",
    activo: "PVRT-M23",
    fecha: "21-05-2023",
    comentarios: "Comments",
  },
];
