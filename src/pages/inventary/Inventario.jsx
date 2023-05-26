import React from "react";
import CustomeTable from "../../components/table/CustomeTable";
import { Breadcrumb } from "flowbite-react";
import { FaHome } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { InventaryType, BrandType } from "../../utils/Types";

const Inventario = () => {
  return (
    <div className="min-h-full w-full p-5 pt-20">
      <div className="flex flex-col md:flex-row justify-between items-center pb-5">
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
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-2 md:gap-5">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <label className="font-bold" htmlFor="type">
              Tipo
            </label>
            <select
              name="type"
              id="type"
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="all">Todos</option>
              {InventaryType.map((item) => (
                <option key={item.clave} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <label className="font-bold" htmlFor="brand">
              Marca
            </label>
            <select
              name="brand"
              id="brand"
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="all">Todos</option>
              {BrandType.map((item) => (
                <option key={item.clave} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2">
            <label className="font-bold" htmlFor="search">
              Buscar
            </label>
            <input
              type="text"
              name="search"
              id="search"
              className="border border-gray-300 rounded-md p-2"
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
