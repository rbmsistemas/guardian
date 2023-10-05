import React, { useContext, useState, useEffect } from "react";
import Context from "../../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { AiFillFileAdd, AiOutlineClear } from "react-icons/ai";
import { Label, Select, TextInput } from "flowbite-react";
import { MdNewReleases, MdOutlineCategory } from "react-icons/md";
import CustomeTable from "../../../components/table/CustomeTable";

const Models = () => {
  const navigate = useNavigate();
  const {
    inventoryModels,
    inventoryBrands,
    inventoryTypes,
    inventories,
    getInventoryModelByParams,
  } = useContext(Context);
  const [modelsData, setModelsData] = useState([]);
  const [totals, setTotals] = useState({ totalEntries: 0, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(null);
  const [filters, setFilters] = useState({
    inventoryType: "",
    brandType: "",
    search: "",
    page: 1,
    quantityResults: 10,
    orderBy: "updatedAt",
    sort: "DESC",
  });

  useEffect(() => {
    setLoading(true);
    const res = async () => {
      const data = await getInventoryModelByParams(filters);
      if (data) {
        setTotals({
          totalEntries: data.totalEntries,
          totalPages: data.totalPages,
        });
      }
    };
    res();
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    const quantityResults = params.get("quantityResults");
    const orderBy = params.get("orderBy");
    const sort = params.get("sort");
    const inventoryType = params.get("inventoryType");
    const brandType = params.get("brandType");
    const search = params.get("search");

    const newfilters = {
      page: page ? page : 1,
      quantityResults: quantityResults ? quantityResults : 10,
      orderBy: orderBy ? orderBy : "updatedAt",
      sort: sort ? sort : "DESC",
      inventoryType: inventoryType ? inventoryType : "",
      brandType: brandType ? brandType : "",
      search: search ? search : "",
    };

    setFilters(newfilters);
  }, []);

  useEffect(() => {
    let data = [];
    inventoryModels.forEach((model) => {
      // count how many inventories have this model
      const totalEntries = inventories.filter(
        (inventory) => inventory.inventoryModelId === model.id
      ).length;
      const brand = inventoryBrands.find(
        (brand) => brand.id === model.inventoryBrandId
      );
      const type = inventoryTypes.find(
        (type) => type.id === model.inventoryTypeId
      );
      data.push({
        id: { key: "id", value: model.id },
        // imagen:{key:'imagen', value: model.image},
        modelo: { key: "modelo", value: model.name },
        marca: { key: "marca", value: brand?.name ?? "" },
        tipo: { key: "tipo", value: type?.name ?? "" },
        ["Equipos registrados"]: { key: "total", value: totalEntries ?? 0 },
      });
    });
    setModelsData(data);
  }, [inventoryModels, inventoryBrands, inventoryTypes]);

  const handleValidateSearch = (e) => {
    const inputValue = e.target.value;

    if (inputValue?.length >= 6) {
      const lastFourChars = inputValue.slice(-6);
      if (
        lastFourChars[0] === lastFourChars[1] &&
        lastFourChars[1] === lastFourChars[2] &&
        lastFourChars[2] === lastFourChars[3] &&
        lastFourChars[3] === lastFourChars[4] &&
        lastFourChars[4] === lastFourChars[5]
      ) {
        return;
      }
    }

    setFilters({ ...filters, search: inputValue });
  };

  useEffect(() => {
    clearTimeout(timer);

    if (filters.search.length > 0) {
      const newTimer = setTimeout(() => {}, 500);

      setTimer(newTimer);
    }
  }, [filters.search]);

  const handleClearFilters = () => {
    setFilters({
      inventoryType: "",
      brandType: "",
      search: "",
      page: 1,
      quantityResults: 10,
      orderBy: "updatedAt",
      sort: "DESC",
    });
    navigate("/inventario/modelos");
  };

  const handleFilterByParams = (value, type) => {
    let params = filters;
    if (type === "inventoryType") {
      params["inventoryType"] = value;
    }
    if (type === "brandType") {
      params["brandType"] = value;
    }
    if (type === "quantityResults" && value.length > 0) {
      params["quantityResults"] = value;
    }
    if (type === "page") {
      if (value == "") {
        delete params["page"];
      } else if (parseInt(value) <= 0) {
        delete params["page"];
      } else {
        params["page"] = String(value);
      }
    }
    if (type === "orderBy") {
      if (
        (params["sort"] === "ASC" && params["orderBy"] === value) ||
        params["sort"] === "" ||
        !params["sort"] ||
        params["sort"] === undefined
      ) {
        if (params["orderBy"] === "" || params["orderBy"] === undefined) {
          delete params["orderBy"];
          delete params["sort"];
        } else {
          params["sort"] = "DESC";
        }
      } else {
        if (value === "") {
          delete params["orderBy"];
          delete params["sort"];
        } else {
          params["sort"] = "ASC";
          params["orderBy"] = value;
        }
      }
    }

    let paramsString = "";

    Object.keys(params).forEach((key) => {
      if (params[key]?.length > 0) {
        paramsString += `${key}=${params[key]}&`;
      }
    });

    paramsString = paramsString.slice(0, -1);
    navigate(`/inventario/modelos?${paramsString}`);
  };

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center pb-2">
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
          Nuevo modelo
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-6 md:grid-cols-12 gap-3 pb-2">
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="inventoryType" value="Tipo" className="font-bold" />
            <Select
              id="inventoryType"
              icon={MdOutlineCategory}
              required={true}
              value={filters.inventoryType}
              onChange={(e) =>
                handleFilterByParams(e.target.value, "inventoryType")
              }
            >
              <option value="">Todos</option>
              {inventoryTypes.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="brandType" value="Marca" className="font-bold" />
            <Select
              id="brandType"
              icon={MdNewReleases}
              required={true}
              value={filters.brandType}
              onChange={(e) =>
                handleFilterByParams(e.target.value, "brandType")
              }
            >
              <option value="">Todos</option>
              {inventoryBrands.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
          </div>
          <div className="col-span-6 md:col-span-3 flex flex-col gap-2">
            <Label htmlFor="search" value="Buscar" />
            <TextInput
              id="search"
              type="text"
              icon={FaSearch}
              placeholder="Modelo, serie, activo fijo"
              required={true}
              value={filters.search}
              onChange={handleValidateSearch}
            />
          </div>
          <div className="col-span-3 md:col-span-1 flex flex-col justify-end pb-1 gap-2">
            <Label htmlFor="" value="&nbsp;" />
            <button
              onClick={handleClearFilters}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center"
            >
              <span>
                <AiOutlineClear className="inline-block mr-2 text-lg" />
              </span>
              <span className="hidden md:block text-sm truncate">Limpiar</span>
            </button>
          </div>
        </div>
      </div>
      <CustomeTable
        showImagen={true}
        data={modelsData}
        onShow={(id) => navigate(`/inventario/modelos/ver/${id}`)}
        onEdit={(id) => navigate(`/inventario/modelos/editar/${id}`)}
        // onDelete={(id) => handleDelete(id)}
        quantityResults={filters.quantityResults}
        sortByHeader
        setQuantityResults={(quantityResults) =>
          handleFilterByParams(quantityResults, "quantityResults")
        }
        setPage={(page) => handleFilterByParams(page, "page")}
        page={filters.page}
        totalEntries={totals.totalEntries}
        totalPages={totals.totalPages}
        onSortFilters={(sort) => handleFilterByParams(sort, "orderBy")}
        order={{ orderBy: filters.orderBy, sort: filters.sort }}
      />
    </div>
  );
};

export default Models;
