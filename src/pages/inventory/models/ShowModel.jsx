import React, { useContext, useEffect, useState } from "react";
import Context from "../../../context/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Base_InventoryModel } from "../../../context/Models";
import { FaHome, FaList, FaRegEdit } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { FormatedUrlImage } from "../../../utils/FormatedUrlImage";
import StatusPieChart from "./charts/StatusPieChart";
import { Card } from "flowbite-react";
import CustomeTable from "../../../components/table/CustomeTable";
import { formatedInventoriesForTable } from "../../../utils/FormatedInventoriesForTable";
import { handleShareInventory } from "../../../utils/ShareInventory";

const ShowModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getInvetoryModelById, inventoryModel, inventories } =
    useContext(Context);
  const [formatedInventories, setFormatedInventories] = useState([]);
  const [totals, setTotals] = useState({ totalEntries: 0, totalPages: 0 });
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
    getInvetoryModelById(id);
  }, [id]);

  useEffect(() => {
    const formated = formatedInventoriesForTable(
      inventoryModel?.inventoryModel
    );
    setFormatedInventories(formated);
  }, [inventories]);

  if (!inventoryModel) {
    return null;
  }

  const data = {
    labels: ["Alta", "Propuesta de baja", "Baja"],
    data: [
      inventoryModel?.altaCount || 0,
      inventoryModel?.propuestaCount || 0,
      inventoryModel?.bajaCount || 0,
    ],
  };

  return (
    <div className="w-full min-h-full">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center md:justify-start items-center space-x-2 p-2">
            <Link to="/" className="text-neutral-500 hover:text-neutral-700">
              <FaHome className="text-xl" />
            </Link>
            <span className="text-neutral-500 text-xl">
              <FiChevronRight />
            </span>
            <Link
              to="/inventario"
              className="text-neutral-500 hover:text-neutral-700"
            >
              Inventario
            </Link>
            <span className="text-neutral-500 text-xl">
              <FiChevronRight />
            </span>
            <Link
              to="/inventario/modelos"
              className="text-neutral-500 hover:text-neutral-700"
            >
              Modelos
            </Link>
            <span className="text-neutral-500 text-xl">
              <FiChevronRight />
            </span>
            <span className="text-neutral-500">{inventoryModel?.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to="/inventario/modelos"
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white flex items-center space-x-2"
            >
              <span>
                <FaList className="text-lg" />
              </span>
              <span className="hidden md:block">Listado</span>
            </Link>
            <Link
              to={`/inventario/modelos/editar/${id}`}
              className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded flex items-center space-x-2"
            >
              <span>
                <FaRegEdit className="text-lg" />
              </span>
              <span className="hidden md:block">Editar</span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 h-[78vh]">
          <Card
            imgSrc={FormatedUrlImage(inventoryModel?.images?.[0])}
            imgAlt={inventoryModel?.name}
            className="col-span-12 md:col-span-4 items-start"
          >
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-3xl font-bold text-purple-800">
                {inventoryModel?.name}
              </h1>
              <p className="text-neutral-500">
                {inventoryModel?.inventoryBrand?.name} -{" "}
                {inventoryModel?.inventoryType?.name}
              </p>
              <p className="text-neutral-500">
                Cantidad de inventarios: {inventoryModel?.inventoriesCount ?? 0}
              </p>
            </div>
          </Card>
          <div className="col-span-12 md:col-span-8 grid grid-cols-12 gap-6 h-full overflow-y-auto">
            <Card className="col-span-12 w-full h-80">
              <h2 className="text-2xl font-bold text-neutral-900 pb-4">
                Inventarios por estado
              </h2>
              <StatusPieChart data={data} height="h-52" />
            </Card>
            <Card className="col-span-12 w-full">
              <h2 className="text-2xl font-bold text-neutral-900 pb-4">
                Inventarios
              </h2>
              <CustomeTable
                data={formatedInventories}
                onShow={(id) => navigate(`/inventario/ver/${id}`)}
                onEdit={(id) => navigate(`/inventario/editar/${id}`)}
                quantityResults={filters.quantityResults}
                page={filters.page}
                totalEntries={totals.totalEntries}
                totalPages={totals.totalPages}
                order={{ orderBy: filters.orderBy, sort: filters.sort }}
              />
              {/* TO DO: continuar con la estructura de la tabla, falta reducir el numero de entradas por pagina */}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowModel;
