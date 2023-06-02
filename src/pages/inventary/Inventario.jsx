import React, { useState } from "react";
import CustomeTable from "../../components/table/CustomeTable";
import { Breadcrumb, Label, Select, TextInput } from "flowbite-react";
import { FaHome, FaSearch } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { InventaryType, BrandType } from "../../utils/Types";
import { MdOutlineCategory } from "react-icons/md";
import { BiRegistered } from "react-icons/bi";

const Inventario = () => {
  const [filters, setFilters] = useState({
    inventaryType: "",
    searchs: "",
    brandType: "",
  });
  return (
    <div className="min-h-full w-full p-5 pt-20">
      <div className="flex flex-col md:flex-row justify-between items-center pb-2">
        <Breadcrumb
          aria-label="Solid background breadcrumb example"
          className=" py-3 px-5 dark:bg-gray-900"
        >
          <Breadcrumb.Item href="/" icon={FaHome}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item href="inventario">Inventario</Breadcrumb.Item>
        </Breadcrumb>
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
        <div className="grid grid-cols-4 gap-2 md:gap-5">
          <div className="col-span-4 md:col-span-1 flex flex-col gap-2">
            <div className="w-full">
              <Label
                htmlFor="inventaryType"
                value="Selecciona el tipo de inventario"
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
              icon={BiRegistered}
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
        <CustomeTable data={data} />
      </div>
    </div>
  );
};

export default Inventario;

const data = [
  {
    id: "001",
    type: "Teléfono",
    brand: "CISCO",
    model: "CP-7821-K9",
    sn: "FCH2132A1JH",
    active: "PVRT-M23",
    date: "21-05-2023",
  },
  {
    id: "002",
    type: "Teléfono",
    brand: "CISCO",
    model: "CP-7821-K9",
    sn: "FCH2132A1JH",
    active: "PVRT-M23",
    date: "21-05-2023",
  },
  {
    id: "003",
    type: "Teléfono",
    brand: "CISCO",
    model: "CP-7821-K9",
    sn: "FCH2132A1JH",
    active: "PVRT-M23",
    date: "21-05-2023",
  },
  {
    id: "004",
    type: "Teléfono",
    brand: "CISCO",
    model: "CP-7821-K9",
    sn: "FCH2132A1JH",
    active: "PVRT-M23",
    date: "21-05-2023",
  },
  {
    id: "005",
    type: "Teléfono",
    brand: "CISCO",
    model: "CP-7821-K9",
    sn: "FCH2132A1JH",
    active: "PVRT-M23",
    date: "21-05-2023",
  },
  {
    id: "006",
    type: "Teléfono",
    brand: "CISCO",
    model: "CP-7821-K9",
    sn: "FCH2132A1JH",
    active: "PVRT-M23",
    date: "21-05-2023",
  },
  {
    id: "007",
    type: "Teléfono",
    brand: "CISCO",
    model: "CP-7821-K9",
    sn: "FCH2132A1JH",
    active: "PVRT-M23",
    date: "21-05-2023",
  },
  {
    id: "008",
    type: "Teléfono",
    brand: "CISCO",
    model: "CP-7821-K9",
    sn: "FCH2132A1JH",
    active: "PVRT-M23",
    date: "21-05-2023",
  },
  {
    id: "009",
    type: "Teléfono",
    brand: "CISCO",
    model: "CP-7821-K9",
    sn: "FCH2132A1JH",
    active: "PVRT-M23",
    date: "21-05-2023",
  },
  {
    id: "010",
    type: "Teléfono",
    brand: "CISCO",
    model: "CP-7821-K9",
    sn: "FCH2132A2JH",
    active: "PVRT-M23",
    date: "21-05-2023",
  },
];
