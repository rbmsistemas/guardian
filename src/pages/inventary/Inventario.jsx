import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import CustomeTable from "../../components/table/CustomeTable";
import { Label, Modal, Select, TextInput } from "flowbite-react";
import { FaCheck, FaHome, FaSearch, FaTimes } from "react-icons/fa";
import { AiFillFileAdd, AiOutlineClear } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  MdNewReleases,
  MdOutlineCategory,
  MdOutlineInventory2,
} from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import { toast } from "react-hot-toast";

const Inventario = () => {
  const navigate = useNavigate();
  const {
    inventaryTypes,
    inventaryBrands,
    inventaryModels,
    deleteInventary,
    getInventariesBySearch,
    inventaries,
  } = useContext(Context);

  const [filters, setFilters] = useState({
    inventaryType: "",
    brandType: "",
    search: "",
    status: "",
    page: 1,
    quantityResults: 5,
  });
  const [totals, setTotals] = useState({ totalEntries: 0, totalPages: 0 });
  const [modal, setModal] = useState(false);
  const [inventaryToDelete, setinventaryToDelete] = useState({});
  const [timer, setTimer] = useState(null);
  const errorNotify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  useEffect(() => {
    const res = async () => {
      const data = await getInventariesBySearch(filters);
      if (data) {
        setTotals({
          totalEntries: data.totalEntries,
          totalPages: data.totalPages,
        });
      }
    };
    res();
  }, [filters]);

  const inventariesData = inventaries?.map((item, index) => {
    return {
      no: index + 1,
      imagen: item.images["image1"],
      tipo: inventaryTypes.find((type) => type.id === item.inventaryTypeId)
        ?.name,
      marca: inventaryBrands.find((brand) => brand.id === item.inventaryBrandId)
        ?.name,
      modelo: inventaryModels.find(
        (model) => model.id === item.inventaryModelId
      )?.name,
      SN: item.serialNumber,
      activo: item.activo,
      estado: item.status ? "Alta" : "Baja",
      id: item.id,
    };
  });

  const handleValidateSearch = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length >= 4) {
      const lastFourChars = inputValue.slice(-4);
      if (
        lastFourChars[0] === lastFourChars[1] &&
        lastFourChars[1] === lastFourChars[2] &&
        lastFourChars[2] === lastFourChars[3]
      ) {
        return;
      }
    }

    setFilters({ ...filters, search: inputValue });
  };

  useEffect(() => {
    clearTimeout(timer);

    if (filters.search.length > 0) {
      const newTimer = setTimeout(() => {
        console.log("Realizar solicitud al servidor:", filters.search);
      }, 500);

      setTimer(newTimer);
    }
  }, [filters.search]);

  const handleDelete = async (id) => {
    setModal(true);
    setinventaryToDelete(inventaries.find((inventary) => inventary.id === id));
  };

  const onDelete = async () => {
    const data = await deleteInventary(inventaryToDelete.id);
    if (!data) {
      errorNotify("Error al eliminar el inventario");
      setModal(false);
      return;
    } else if (data) {
      const res = await getInventariesBySearch(filters);
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
        <div className="grid grid-cols-6 gap-2 md:gap-5 pb-2">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <div className="w-full">
              <Label
                htmlFor="inventaryType"
                value="Tipo"
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
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <div className="w-full">
              <Label htmlFor="status" value="Status" className="font-bold" />
            </div>
            <Select
              id="status"
              icon={MdNewReleases}
              required={true}
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
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
              onChange={handleValidateSearch}
            />
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col justify-end pb-1 gap-2">
            <div className="w-full hidden md:block">
              <Label htmlFor="" value="&nbsp;" />
            </div>
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  status: "",
                  brandType: "",
                  inventaryType: "",
                  page: 1,
                  quantityResults: 5,
                })
              }
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded flex gap-2 items-center justify-center transition ease-in-out duration-200 hover:scale-105"
            >
              <span>
                <AiOutlineClear className="text-white text-lg" />
              </span>
              <span className="hidden md:block text-sm">Limpiar</span>
            </button>
          </div>
        </div>
        {totals.totalEntries == 0 ? (
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
            data={inventariesData}
            onShow={(id) => navigate(`/inventario/ver/${id}`)}
            onEdit={(id) => navigate(`/inventario/editar/${id}`)}
            onDelete={(id) => handleDelete(id)}
            quantityResults={filters.quantityResults}
            setQuantityResults={(quantityResults) =>
              setFilters({ ...filters, quantityResults })
            }
            page={filters.page}
            setPage={(page) => setFilters({ ...filters, page })}
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
                {inventaryTypes.find(
                  (item) => item.id === inventaryToDelete.inventaryTypeId
                )?.name +
                  " " +
                  inventaryBrands.find(
                    (item) => item.id === inventaryToDelete.inventaryBrandId
                  )?.name +
                  " Modelo " +
                  inventaryModels.find(
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

export default Inventario;
