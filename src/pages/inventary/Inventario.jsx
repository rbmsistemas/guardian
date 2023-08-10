import React, { useContext, useState } from "react";
import Context from "../../context/Context";
import CustomeTable from "../../components/table/CustomeTable";
import { Label, Select, TextInput } from "flowbite-react";
import { FaHome, FaSearch } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdNewReleases, MdOutlineCategory } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";

const Inventario = () => {
  const { inventaryTypes, inventaryBrands, inventaryModels, inventaries } =
    useContext(Context);

  const inventariesData = inventaries.map((item, index) => {
    return {
      id: index + 1,
      imagen: item.images["image1"],
      tipo: inventaryTypes.find((type) => type.id === item.inventaryTypeId)
        .name,
      marca: inventaryBrands.find((brand) => brand.id === item.inventaryBrandId)
        .name,
      modelo: inventaryModels.find(
        (model) => model.id === item.inventaryModelId
      ).name,
      SN: item.serialNumber,
      activo: item.activo,
      estado: item.status ? "Alta" : "Baja",
    };
  });

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
              {inventaryTypes.map((item) => {
                return (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
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
              {inventaryBrands.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
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
        <CustomeTable showId={true} showImagen={true} data={inventariesData} />
      </div>
    </div>
  );
};

export default Inventario;
