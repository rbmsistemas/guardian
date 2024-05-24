import React, { useEffect, useState, useContext } from "react";
import Context from "../../context/Context";

import {
  FaCheck,
  FaHome,
  FaList,
  FaRegEdit,
  FaRegTrashAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Label, Modal } from "flowbite-react";
import {
  MdCalendarMonth,
  MdCheckCircle,
  MdNewReleases,
  MdOutlineInventory2,
} from "react-icons/md";
import Loading from "../../utils/Loading";
import { BiDevices } from "react-icons/bi";
import { Tb3DCubeSphere } from "react-icons/tb";
import { AiOutlineFieldNumber, AiOutlineNumber } from "react-icons/ai";
import "../../Quill.css";
import { toast } from "react-hot-toast";
import { Base_Inventory } from "../../context/Models";
import InventoryDetailsView from "./InventoryDetails";
import ModalImages from "../../components/modals/ModalImages";
import InventoryDetail from "../../utils/InventoryDetail";

let inventoryDetailHeaders = [
  {
    title: "Status",
    key: "status",
    type: "text",
    icon: MdCheckCircle,
  },
  {
    title: "Tipo de inventario",
    key: "inventoryTypeId",
    type: "text",
    icon: BiDevices,
  },
  {
    title: "Marca",
    key: "inventoryBrandId",
    type: "text",
    icon: MdNewReleases,
  },
  {
    title: "Modelo",
    key: "inventoryModelId",
    type: "text",
    icon: Tb3DCubeSphere,
  },
  {
    title: "Número Serial",
    key: "serialNumber",
    type: "text",
    icon: AiOutlineFieldNumber,
  },
  {
    title: "Activo",
    key: "activo",
    type: "text",
    icon: AiOutlineNumber,
  },
  {
    title: "Creado por",
    key: "createdBy",
    type: "text",
    icon: FaUser,
  },
  {
    title: "Fecha de recepción",
    key: "recepcionDate",
    type: "date",
    icon: MdCalendarMonth,
  },
  {
    title: "Fecha de alta",
    key: "altaDate",
    type: "date",
    icon: MdCalendarMonth,
  },
  {
    title: "Fecha de baja",
    key: "bajaDate",
    type: "date",
    icon: MdCalendarMonth,
  },
  {
    title: "Fecha de creación",
    key: "createdAt",
    type: "date",
    icon: MdCalendarMonth,
  },
  {
    title: "Ultima modificación",
    key: "updatedAt",
    type: "date",
    icon: MdCalendarMonth,
  },
];

const ShowInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inventory, getInventoryById, deleteInventory } = useContext(Context);
  const [modal, setModal] = useState(false);
  const errorNotify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  const [inventario, setInventario] = useState(Base_Inventory());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getInventoryById(id);
  }, [id]);

  useEffect(() => {
    if (inventory.id) {
      setInventario({
        id: inventory.id ?? "",
        inventoryTypeId: inventory?.inventoryModel?.inventoryType?.name ?? "",
        inventoryBrandId: inventory?.inventoryModel?.inventoryBrand?.name ?? "",
        inventoryModelId: inventory?.inventoryModel?.name ?? "",
        serialNumber: inventory.serialNumber ?? "",
        activo: inventory.activo ?? "",
        comments: inventory.comments ?? "",
        status: inventory.status ?? false,
        images: inventory?.images ?? [],
        altaDate: inventory.altaDate ?? "",
        bajaDate: inventory.bajaDate ?? null,
        createdBy: inventory.createdBy ?? "",
        recepcionDate: inventory.recepcionDate ?? null,
        details: inventory.details ?? [],
        createdAt: inventory.createdAt ?? "",
        updatedAt: inventory.updatedAt ?? "",
      });
    }
    setLoading(false);
  }, [inventory]);

  const onDelete = async () => {
    setLoading(true);
    const data = await deleteInventory(inventario.id);
    if (!data) {
      errorNotify("Error al eliminar el inventario");
      setModal(false);
      setLoading(false);
      return;
    }

    successNotify("Inventario eliminado correctamente");
    clearInventory();
    setTimeout(() => {
      navigate("/inventario");
    }, 500);
    setModal(false);
    setLoading(false);
  };
  const clearInventory = () => {
    setInventario(Base_Inventory());
  };

  let inventarioTitle =
    inventario.inventoryTypeId +
    " " +
    inventario.inventoryBrandId +
    " Modelo " +
    inventario.inventoryModelId;

  return (
    <div className="min-h-full w-full p-4 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
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
            to="#"
            className="text-neutral-500 hover:text-neutral-700 truncate whitespace-pre-wrap"
          >
            {inventario.inventoryTypeId + " " + inventario.inventoryBrandId}
          </Link>
        </div>
        <div className="flex gap-2 items-center justify-center md:justify-end">
          <Link
            to="/inventario"
            className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <FaList className="text-white text-lg" />
            </span>
            Listado
          </Link>

          <Link
            to={`/inventario/editar/${id}`}
            className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <FaRegEdit className="text-white text-lg" />
            </span>
            Editar
          </Link>
          <button
            onClick={() => {
              setModal(true);
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <FaRegTrashAlt className="text-white text-lg" />
            </span>
            Eliminar
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5 rounded-lg bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold text-gray-700">
              Detalles del inventario
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          {inventoryDetailHeaders.map((header, index) => (
            <div
              key={index}
              className={`col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-1 flex flex-col gap-2 border-b ${
                header.key == "status" && inventario?.status == 1
                  ? " border-green-500"
                  : inventario?.status == 2
                  ? "border-amber-500"
                  : inventario?.status == 3
                  ? "border-red-500"
                  : "border-gray-300"
              } justify-end`}
            >
              <InventoryDetail
                id={header.key}
                title={header.title}
                value={inventario[header.key]}
                type={header.type}
                icon={header.icon}
              />
            </div>
          ))}
        </div>
        <div className="py-2 w-full">
          <Label
            className="text-xl uppercase"
            htmlFor="details"
            value="Detalles y Grupos"
          />
          <InventoryDetailsView data={inventario.details} />
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="comments" value="Comentarios" />
            </div>
            <div
              className="text-gray-500 min-h-[7vh] list-disc pl-4 w-full"
              dangerouslySetInnerHTML={{ __html: inventario.comments }}
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 flex flex-col gap-2">
            <div className="w-full">
              <Label htmlFor="images" value="Imagenes" />
            </div>
            {/* <div className="flex flex-wrap gap-4 w-full overflow-x-auto">
              {inventario.images?.map((image, index) => (
                <div
                  key={index}
                  className="max-w-[9rem] max-h-36 col-span-1 rounded-md flex items-center justify-center border border-gray-300 p-3 cursor-pointer"
                >
                  <img
                    onClick={() => handleShowImages(index)}
                    src={FormatedUrlImage(image)}
                    alt="imagen"
                    className="w-full h-full min-w-[7rem] min-h-[7rem] object-contain rounded-md"
                  />
                </div>
              ))}
            </div> */}
            {inventario.images && (
              <ModalImages title={inventarioTitle} images={inventario.images} />
            )}
          </div>
        </div>
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
                {inventario.inventoryTypeId +
                  " " +
                  inventario.inventoryBrandId +
                  " Modelo " +
                  inventario.inventoryModelId +
                  " SN - " +
                  inventario.serialNumber}
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
      {loading && <Loading />}
    </div>
  );
};
export default ShowInventory;
