import React, { lazy, useContext, useEffect, useMemo, useState } from "react";
import Context from "../../context/Context";
import { Label, Modal } from "flowbite-react";
import { FaCheck, FaHome, FaSearch, FaTimes } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MdNewReleases,
  MdOutlineAdd,
  MdOutlineInventory2,
} from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { formatLocalDate } from "../../utils/getFormatedDate";
import { AppUrl } from "../../api/inventory.api";
import { urlEnv } from "../../api/request.api";
import AutocompleteInput from "../../components/inputs/AutocompleteInput";
import { BiDevices } from "react-icons/bi";
import TextInput from "../../components/inputs/TextInput";
import { TbStatusChange } from "react-icons/tb";
import { formatedInventoriesForTable } from "../../utils/FormatedInventoriesForTable";
const ExportExcel = lazy(() => import("../../exports/ExportExcel"));
const CustomeTable = lazy(() => import("../../components/table/CustomeTable"));

const Inventory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    inventoryTypes,
    inventoryBrands,
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
    orderBy: "updatedAt",
    sort: "DESC",
  });

  const [inventoriesData, setInventoriesData] = useState([]);
  const [totals, setTotals] = useState({ totalEntries: 0, totalPages: 0 });
  const [modal, setModal] = useState(false);
  const [inventoryToDelete, setInventoryToDelete] = useState({});
  const [timer, setTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultsToExport, setresultsToExport] = useState([]);
  const errorNotify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const inventoryType = params.get("inventoryType") ?? "";
    const brandType = params.get("brandType") ?? "";
    let search = filters.search || "";
    const status = params.get("status") ?? "";
    const page = params.get("page") ?? 1;
    const quantityResults = params.get("quantityResults") ?? 10;
    const orderBy = params.get("orderBy") ?? "updatedAt";
    const sort = params.get("sort") ?? "DESC";

    // if (location.state?.search) {
    //   console.log(location.state.search);
    //   search = location.state.search;
    // }

    let newFilters = {
      inventoryType,
      brandType,
      search,
      status,
      page,
      quantityResults,
      orderBy,
      sort,
    };
    setIsLoading(true);
    setFilters(newFilters);

    const fetchData = async () => {
      try {
        const data = await getInventoriesByParams(newFilters);
        if (data) {
          setTotals({
            totalEntries: data.totalEntries,
            totalPages: data.totalPages,
          });
          const formatedInventories = formatedInventoriesForTable(
            data?.inventories ?? [],
            location
          );
          setInventoriesData(formatedInventories);
        }
      } catch (error) {
        errorNotify("Error al obtener los inventarios");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.search, filters.search]);

  useEffect(() => {
    clearTimeout(timer);

    if (filters.search.length > 0) {
      const newTimer = setTimeout(() => {}, 500);

      setTimer(newTimer);
    }
  }, [filters.search]);

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

    setFilters({ ...filters, search: inputValue });
  };

  const handleDelete = async (id) => {
    setModal(true);
    setInventoryToDelete(inventories.find((inventory) => inventory.id === id));
  };

  const onDelete = async () => {
    const data = await deleteInventory(inventoryToDelete.id);
    if (!data) {
      errorNotify("Error al eliminar el inventario");
      setModal(false);
      return;
    } else if (data) {
      const res = await getInventoriesByParams(filters);
      if (res) {
        const inventoryUpdated = inventories.filter(
          (inventory) => inventory.id !== inventoryToDelete.id
        );
        setInventoriesData(
          formatedInventoriesForTable(inventoryUpdated, location)
        );
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
      orderBy: "updatedAt",
      sort: "DESC",
    });
    navigate("/inventario");
  };

  const handleFilterByParams = useMemo(
    () => (value, type) => {
      let params = filters;

      if (type == "inventoryType") {
        params["inventoryType"] = value?.toString() ?? "";
      }
      if (type === "brandType") {
        params["brandType"] = value?.toString() ?? "";
      }
      if (type === "status") {
        if (value === "") {
          delete params["status"];
        } else {
          params["status"] = value?.toString() ?? "";
        }
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
      navigate(`/inventario?${paramsString}`);
    },
    [filters, navigate]
  );

  const handleCopyToClipboard = (id) => {
    const inventory = inventories.find((item) => item.id === id);
    const inventoryType = inventory?.inventoryModel?.inventoryType?.name;
    const inventoryBrand = inventory?.inventoryModel?.inventoryBrand?.name;
    const inventoryModel = inventory?.inventoryModel?.name;
    const serialNumber = inventory?.serialNumber;
    const activo = inventory?.activo;
    const status = inventory?.status;
    const createdAt = formatLocalDate(inventory["fecha creacion"]);
    const updatedAt = formatLocalDate(inventory["fecha actualizacion"]);
    const imgage = inventory?.imagenes[0];

    const stringToCopy = `Tipo: ${inventoryType}\nMarca: ${inventoryBrand}\nModelo: ${inventoryModel}\nSN: ${serialNumber}\nActivo: ${activo}\nStatus: ${
      status === 1 ? "Alta" : status === 2 ? "Propuesta de Baja" : "Baja"
    }\nCreado: ${createdAt}\nActualizado: ${updatedAt}\n\n ${AppUrl}/inventario/ver/${id}`;
    navigator.clipboard.writeText(stringToCopy);
    successNotify("Inventario copiado al portapapeles");
  };

  const handleDataToExport = (data, idsToExport) => {
    const inventoriesToExport = data.filter((item) =>
      idsToExport.includes(item.id)
    );
    const dataToExport = inventoriesToExport.map((item, index) => {
      return {
        "#":
          filters.page * filters.quantityResults -
          filters.quantityResults +
          1 +
          index,
        Tipo: item.tipo,
        Marca: item.marca,
        Modelo: item.modelo,
        SN: item.sn,
        Activo: item.activo,
        Status:
          item.status == 1
            ? "Alta"
            : item.status == 2
            ? "Propuesta de Baja"
            : "Baja",
        Creacion: formatLocalDate(item["fecha creacion"]),
        Actualizacion: item?.updatedAt
          ? formatLocalDate(item["fecha actualizacion"])
          : "",
        Imagen: urlEnv + item?.imagenes[0] || "",
        Id: item.id,
      };
    });
    return dataToExport;
  };

  return (
    <div className="min-h-full w-full p-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center pb-4">
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
        <div className="grid grid-cols-3 gap-2 items-center w-full md:w-auto">
          <Link
            to="/inventario/crear"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex gap-2 items-center justify-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <MdOutlineAdd className="text-white text-lg" />
            </span>
            <span className="hidden md:block text-sm truncate">
              Nuevo inventario
            </span>
          </Link>
          <button
            onClick={handleClearFilters}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded flex justify-center items-center"
          >
            <span>
              <AiOutlineClear className="text-lg" />
            </span>
            <span className="hidden md:block text-sm truncate">Limpiar</span>
          </button>
          <ExportExcel
            disabled={resultsToExport.length === 0}
            headers={[
              "#",
              "Tipo",
              "Marca",
              "Modelo",
              "SN",
              "Activo",
              "Status",
              "Creacion",
              "Actualizacion",
              "Id",
              "Imagen",
            ]}
            data={handleDataToExport(inventories, resultsToExport)}
            filename={"inventarios" + new Date().getTime() + ".xlsx"}
            title="Exportar"
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 rounded-lg">
        <div className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-2 pb-2">
          <div className="col-span-6 md:col-span-3 flex flex-col gap-2">
            <Label
              className="hidden md:block"
              htmlFor="inventoryType"
              value="Tipo"
            />
            <AutocompleteInput
              id={"inventoryType"}
              name={"inventoryType"}
              placeholder="Tipo"
              data={
                inventoryTypes?.map((type) => ({
                  value: type.id,
                  label: type.name,
                })) ?? []
              }
              value={filters.inventoryType}
              onChange={(e) => handleFilterByParams(e.value, "inventoryType")}
              icon={BiDevices}
              isClearable
            />
          </div>
          <div className="col-span-6 md:col-span-3 flex flex-col gap-2">
            <Label
              className="hidden md:block"
              htmlFor="brandType"
              value="Marca"
            />
            <AutocompleteInput
              id={"brandType"}
              name={"brandType"}
              placeholder="Marca"
              data={
                inventoryBrands?.map((type) => ({
                  value: type.id,
                  label: type.name,
                })) ?? []
              }
              value={filters.brandType}
              onChange={(e) => handleFilterByParams(e.value, "brandType")}
              icon={MdNewReleases}
              isClearable
            />
          </div>
          <div className="col-span-6 md:col-span-2 flex flex-col gap-2">
            <Label
              className="hidden md:block"
              htmlFor="status"
              value="Status"
            />
            <AutocompleteInput
              id={"status"}
              name={"status"}
              placeholder="Status"
              data={
                [
                  { value: 1, label: "Alta" },
                  { value: 2, label: "Propuesta de baja" },
                  { value: 3, label: "Baja" },
                ] ?? []
              }
              value={filters.status}
              onChange={(e) => handleFilterByParams(e.value, "status")}
              icon={TbStatusChange}
              cancelWrite
              isClearable
            />
          </div>
          <div className="col-span-6 md:col-span-4 flex flex-col gap-2">
            <Label
              className="hidden md:block"
              htmlFor="search"
              value="Buscar"
            />
            <TextInput
              id="search"
              type="text"
              icon={FaSearch}
              placeholder="Modelo, Serie, Activo, comentarios"
              required={true}
              value={filters.search}
              isClearable
              onChange={handleValidateSearch}
            />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-2 min-h-[70vh]">
          <ClipLoader color="#7E3AF2" size={50} loading={isLoading} />
        </div>
      ) : (
        totals.totalEntries === 0 && (
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
        )
      )}

      {!isLoading && totals.totalEntries >= 1 && (
        <CustomeTable
          data={inventoriesData}
          onShare={(id) => handleCopyToClipboard(id)}
          onShow={"/inventario/ver/"}
          onEdit={"/inventario/editar/"}
          onDelete={(id) => handleDelete(id)}
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
          exportResults
          resultsToExport={resultsToExport}
          setResultsToExport={setresultsToExport}
        />
      )}
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
            <p className="text-neutral-700 pb-4 font-medium">
              ¿Está seguro que desea eliminar el inventario?
            </p>
            <ul className="list-disc list-inside">
              <li>
                <span className="font-semibold">Tipo:</span>{" "}
                {inventoryToDelete?.tipo}
              </li>

              <li>
                {" "}
                <span className="font-semibold">Marca:</span>{" "}
                {inventoryToDelete?.marca}
              </li>
              <li>
                {" "}
                <span className="font-semibold">Modelo:</span>{" "}
                {inventoryToDelete?.modelo}
              </li>
              <li>
                {" "}
                <span className="font-semibold">Serie:</span>{" "}
                {inventoryToDelete?.sn}
              </li>
              <li>
                {" "}
                <span className="font-semibold">Activo:</span>{" "}
                {inventoryToDelete?.activo}
              </li>
            </ul>
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

export default Inventory;
