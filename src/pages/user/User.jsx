import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import CustomeTable from "../../components/table/CustomeTable";
import { Label, Modal, Select, TextInput } from "flowbite-react";
import { FaCheck, FaHome, FaSearch, FaTimes } from "react-icons/fa";
import {
  AiFillFileAdd,
  AiOutlineClear,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MdNewReleases,
  MdOutlineCategory,
  MdOutlineInventory2,
} from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const User = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    inventoryTypes,
    inventoryBrands,
    inventoryModels,
    deleteInventory,
    getInventoriesByParams,
    inventories,
  } = useContext(Context);

  const [filters, setFilters] = useState({
    inventoryType: "",
    brandType: "",
    search: "",
    status: "",
    page: 1,
    quantityResults: 10,
  });
  const [inventoriesData, setInventoriesData] = useState([]);
  const [totals, setTotals] = useState({ totalEntries: 0, totalPages: 0 });
  const [modal, setModal] = useState(false);
  const [inventaryToDelete, setinventaryToDelete] = useState({});
  const [timer, setTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const errorNotify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  useEffect(() => {
    setIsLoading(true);
    const res = async () => {
      const data = await getInventoriesByParams(filters);
      if (data) {
        setTotals({
          totalEntries: data.totalEntries,
          totalPages: data.totalPages,
        });
      }
    };
    res();
    setIsLoading(false);
  }, [filters]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const status = params.get("status") || "";
    const brandType = params.get("brandType") || "";
    const inventoryType = params.get("inventoryType") || "";
    const page = params.get("page") || 1;
    const quantityResults = params.get("quantityResults") || 10;
    setFilters({
      ...filters,
      search: search ?? filters.search,
      status: status === "" ? "" : status,
      brandType: brandType ?? filters.brandType,
      inventoryType: inventoryType ?? filters.inventoryType,
      page: parseInt(page) <= 0 ? 1 : page,
      quantityResults: quantityResults ?? filters.quantityResults,
    });
  }, [location]);

  useEffect(() => {
    let formatInventories = [];
    if ((inventories, inventoryModels || inventoryBrands || inventoryTypes)) {
      formatInventories = inventories?.map((item, index) => {
        return {
          no: index + 1,
          tipo: inventoryTypes?.find(
            (type) => type.id === item.inventoryModel?.inventoryTypeId
          )?.name,
          marca: inventoryBrands?.find(
            (brand) => brand.id === item.inventoryModel?.inventoryBrandId
          )?.name,
          modelo: item.inventoryModel?.name,
          SN: item.serialNumber,
          activo: item.activo,
          status: item.status,
          creacion: new Date(item.createdAt).toLocaleDateString(),
          id: item.id,
        };
      });
    }
    setInventoriesData(formatInventories);
  }, [inventories, inventoryModels, inventoryBrands, inventoryTypes]);

  const handleValidateSearch = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length >= 6) {
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

    // return { status: true, value: inputValue };
    setFilters({ ...filters, search: inputValue });
  };

  useEffect(() => {
    clearTimeout(timer);

    if (filters.search.length > 0) {
      const newTimer = setTimeout(() => {}, 500);

      setTimer(newTimer);
    }
  }, [filters.search]);

  const handleDelete = async (id) => {
    setModal(true);
    setinventaryToDelete(inventories.find((inventary) => inventary.id === id));
  };

  const onDelete = async () => {
    const data = await deleteInventory(inventaryToDelete.id);
    if (!data) {
      errorNotify("Error al eliminar el inventario");
      setModal(false);
      return;
    } else if (data) {
      const res = await getInventoriesByParams(filters);
      if (res) {
        setTotals({
          totalEntries: res.totalEntries,
          totalPages: res.totalPages,
        });
        successNotify("Inventario eliminado correctamente");
      }
      setModal(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "",
      brandType: "",
      inventoryType: "",
      page: 1,
      quantityResults: 10,
    });
    navigate("/inventario");
  };

  const handleFilterByParams = (value, type) => {
    let params = filters;
    if (type === "inventoryType") {
      params["inventoryType"] = value;
    }
    if (type === "brandType") {
      params["brandType"] = value;
    }
    if (type === "status") {
      if (value === "") {
        delete params["status"];
      } else {
        params["status"] = value;
      }
    }
    // if (
    //   type === "search" &&
    //   handleValidateSearch({ target: { value } }).status &&
    //   value?.trim() != ""
    // ) {
    //   params["search"] = value;
    // } else {
    //   return;
    // }
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

    let paramsString = "";
    Object.keys(params).forEach((key) => {
      if (params[key]?.length > 0) {
        paramsString += `${key}=${params[key]}&`;
      }
    });

    paramsString = paramsString.slice(0, -1);

    navigate(`/inventario?${paramsString}`);
  };

  return (
    <div className="min-h-full w-full p-5">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center pb-2">
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
        <div className="grid grid-cols-6 gap-2 md:gap-5 pb-2">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <div className="w-full">
              <Label
                htmlFor="inventoryType"
                value="Tipo"
                className="font-bold"
              />
            </div>
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
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <div className="w-full">
              <Label htmlFor="brandType" value="Marca" className="font-bold" />
            </div>
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
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <div className="w-full">
              <Label htmlFor="status" value="Status" className="font-bold" />
            </div>
            <Select
              id="status"
              icon={AiOutlinePoweroff}
              required={true}
              value={filters.status}
              onChange={(e) => handleFilterByParams(e.target.value, "status")}
            >
              <option value="">Todos</option>
              <option value={1}>Alta</option>
              <option value={0}>Baja</option>
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
              value={filters.search}
              // onChange={(e) => handleFilterByParams(e.target.value, "search")}
              onChange={handleValidateSearch}
            />
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col justify-end pb-1 gap-2">
            <div className="w-full hidden md:block">
              <Label htmlFor="" value="&nbsp;" />
            </div>
            <button
              onClick={handleClearFilters}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded flex gap-2 items-center justify-center transition ease-in-out duration-200 hover:scale-105"
            >
              <span>
                <AiOutlineClear className="text-white text-lg" />
              </span>
              <span className="hidden md:block text-sm">Limpiar</span>
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <ClipLoader color="#7E3AF2" size={100} loading={isLoading} />
          </div>
        ) : !isLoading && totals.totalEntries == 0 ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-2xl font-semibold">No hay resultados</h1>
            <p className="text-gray-500">
              No se encontraron resultados para la búsqueda{" "}
              <span className="font-semibold">{filters.search}</span>
              <span className="font-semibold">
                {
                  {
                    1: " en estado activo",
                    0: " en estado inactivo",
                  }[filters.status]
                }
              </span>
            </p>
          </div>
        ) : (
          <CustomeTable
            showImagen={true}
            data={inventoriesData}
            onShow={(id) => navigate(`/inventario/ver/${id}`)}
            onEdit={(id) => navigate(`/inventario/editar/${id}`)}
            onDelete={(id) => handleDelete(id)}
            quantityResults={filters.quantityResults}
            setQuantityResults={(quantityResults) =>
              handleFilterByParams(quantityResults, "quantityResults")
            }
            setPage={(page) => handleFilterByParams(page, "page")}
            page={filters.page}
            totalEntries={totals.totalEntries}
            totalPages={totals.totalPages}
          />
        )}
      </div>
      {modal && (
        <Modal
          title="Eliminar inventario"
          dismissible={true}
          onClose={() => {
            setModal(false);
          }}
          show={modal}
        >
          <Modal.Header>
            <div className="flex gap-2 items-center">
              <span className="bg-red-500 rounded-full p-2">
                <MdOutlineInventory2 className="text-white text-xl" />
              </span>
              <p className="text-xl font-bold text-red-500">
                Eliminar inventario
              </p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <p className="text-gray-500">
              ¿Está seguro que desea eliminar el inventario{" "}
              <span className="font-bold">
                {inventoryTypes.find(
                  (item) => item.id === inventaryToDelete.inventoryTypeId
                )?.name +
                  " " +
                  inventoryBrands.find(
                    (item) => item.id === inventaryToDelete.inventaryBrandId
                  )?.name +
                  " Modelo " +
                  inventoryModels.find(
                    (item) => item.id === inventaryToDelete.inventaryModelId
                  )?.name +
                  " SN - " +
                  inventaryToDelete.serialNumber}
              </span>
              ?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex justify-end gap-2 w-full">
              <button
                onClick={() => {
                  onDelete();
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
              >
                <span>
                  <FaCheck className="text-white text-lg" />
                </span>
                Aceptar
              </button>
              <button
                onClick={() => {
                  setModal(false);
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
              >
                <span>
                  <FaTimes className="text-white text-lg" />
                </span>
                Cancelar
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default User;
