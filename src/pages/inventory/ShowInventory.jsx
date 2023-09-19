import React, { useEffect, useState, useContext } from "react";
import Context from "../../context/Context";

import {
  FaCheck,
  FaHome,
  FaImage,
  FaList,
  FaRegEdit,
  FaRegTrashAlt,
  FaTimes,
  FaUser,
  FaUserCheck,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { Label, Modal } from "flowbite-react";
import {
  MdCalendarMonth,
  MdNewReleases,
  MdOutlineCategory,
  MdOutlineInventory2,
} from "react-icons/md";
import Loading from "../../utils/Loading";
import { formatLocalDate } from "../../utils/getFormatedDate";
import { BiDevices } from "react-icons/bi";
import { Tb3DCubeSphere } from "react-icons/tb";
import { AiOutlineFieldNumber, AiOutlineNumber } from "react-icons/ai";
import "../../Quill.css";
import { toast } from "react-hot-toast";
import ModalImageViewer from "../../components/modals/ModalImageViewer";
import { Base_Inventory } from "../../context/Models";
import { FormatedUrlImage } from "../../utils/FormatedUrlImage";

const ShowInventory = () => {
  const { id } = useParams();
  const {
    inventory,
    getInventoryById,
    inventoryTypes,
    inventoryBrands,
    inventoryModels,
    deleteInventory,
  } = useContext(Context);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const errorNotify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  const [imageSelected, setImageSelected] = useState(0);

  const handleShowImages = (index) => {
    setImageSelected(index);
    setModal2(true);
  };

  const [inventario, setInventario] = useState(Base_Inventory());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getInventoryById(id);
  }, [id]);

  useEffect(() => {
    if (inventory.id) {
      setInventario({
        id: inventory.id ?? "",
        inventoryTypeId:
          inventoryTypes.find(
            (item) =>
              item.id ===
              (inventoryModels.find(
                (item) => item.id === inventory.inventoryModelId
              )?.inventoryTypeId ?? "")
          )?.name ?? "",
        inventoryBrandId:
          inventoryBrands.find(
            (item) =>
              item.id ===
              (inventoryModels.find(
                (item) => item.id === inventory.inventoryModelId
              )?.inventoryBrandId ?? "")
          )?.name ?? "",
        inventoryModelId:
          inventoryModels.find((item) => item.id === inventory.inventoryModelId)
            ?.name ?? "",
        serialNumber: inventory.serialNumber ?? "",
        activo: inventory.activo ?? "",
        comments: inventory.comments ?? "",
        status: inventory.status ?? false,
        images: inventory?.images ?? [],
        altaDate: inventory.altaDate ?? "",
        bajaDate: inventory.bajaDate ?? null,
        createdBy: inventory.createdBy ?? "",
        recepcionDate: inventory.recepcionDate ?? null,
        createdAt: inventory.createdAt ?? "",
        updatedAt: inventory.updatedAt ?? "",
      });
    }
    setLoading(false);
  }, [inventory]);

  const onDelete = async () => {
    setLoading(true);
    console.log("inventario", inventario);
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
    <div className="min-h-full w-full p-5 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex gap-2 items-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <FaHome className="text-xl" />
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="/inventario" className="text-gray-500 hover:text-gray-700">
            Inventario
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="#" className="text-gray-500 hover:text-gray-700 truncate">
            {inventario.inventoryTypeId + " " + inventario.inventoryBrandId}
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-end">
          <Link
            to="/inventario"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
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
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="inventoryTipe" value="Tipo de inventario" />
            </div>
            <p className="text-gray-500 flex items-start gap-4">
              <span>
                <BiDevices className="text-blue-500 text-xl" />
              </span>
              {inventario.inventoryTypeId}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="inventoryBrand" value="Marca" />
            </div>
            <p className="text-gray-500 flex items-start gap-4">
              <span>
                <MdNewReleases className="text-blue-500 text-xl" />
              </span>
              {inventario.inventoryBrandId}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="inventoryMode" value="Modelo" />
            </div>
            <p className="text-gray-500 flex items-start gap-4">
              <span>
                <Tb3DCubeSphere className="text-blue-500 text-xl" />
              </span>
              {inventario.inventoryModelId}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="sn" value="Número Serial" />
            </div>
            <p className="text-gray-500 flex items-start gap-4">
              <span>
                <AiOutlineFieldNumber className="text-blue-500 text-xl" />
              </span>
              {inventario.serialNumber}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="activo" value="Activo" />
            </div>
            <p className="text-gray-500 flex items-start gap-4">
              <span>
                <AiOutlineNumber className="text-blue-500 text-xl" />
              </span>
              {inventario.activo}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="" value="Activo" />
            </div>
            <p className="text-gray-500 flex items-start gap-4">
              <span>
                <MdOutlineCategory className="text-blue-500 text-xl" />
              </span>
              {inventario.status ? "Alta" : "Baja"}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="activo" value="Creado por" />
            </div>
            <p className="text-gray-500 flex items-start gap-4">
              <span>
                <FaUser className="text-blue-500 text-xl" />
              </span>
              {inventario.createdBy}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="recepcionDate" value="Fecha de recepción" />
            </div>
            <p className="text-gray-500 flex items-start gap-4">
              <span>
                <MdCalendarMonth className="text-blue-500 text-xl" />
              </span>
              {formatLocalDate(inventario.recepcionDate)}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="altaDate" value="Fecha de alta" />
            </div>
            <p className="text-gray-500 flex items-start gap-4">
              <span>
                <MdCalendarMonth className="text-blue-500 text-xl" />
              </span>
              {formatLocalDate(inventario.altaDate)}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="bajaDate" value="Fecha de baja" />
            </div>
            <p className="text-gray-500 flex items-start gap-4">
              <span>
                <MdCalendarMonth className="text-blue-500 text-xl" />
              </span>
              {inventario.bajaDate
                ? formatLocalDate(inventario.bajaDate)
                : "N/A"}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="createdAt" value="Fecha de creación" />
              <p className="text-gray-500 flex items-start gap-4">
                <span>
                  <MdCalendarMonth className="text-blue-500 text-xl" />
                </span>
                {formatLocalDate(inventario.createdAt)}
              </p>
            </div>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="updatedAt" value="Ultima modificación" />
              <p className="text-gray-500 flex items-start gap-4">
                <span>
                  <MdCalendarMonth className="text-blue-500 text-xl" />
                </span>
                {formatLocalDate(inventario.updatedAt)}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="comments" value="Comentarios" />
            </div>
            <div
              className="text-gray-500 min-h-[15vh] list-disc pl-4 w-full"
              dangerouslySetInnerHTML={{ __html: inventario.comments }}
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 flex flex-col gap-2">
            <div className="w-full">
              <Label htmlFor="images" value="Imagenes" />
            </div>
            <div className="flex flex-wrap gap-4 w-full overflow-x-auto">
              {inventario.images?.map((image, index) => (
                <div
                  key={index}
                  className="max-w-[9rem] max-h-36 col-span-1 rounded-md flex items-center justify-center border border-gray-300 p-3 cursor-pointer"
                >
                  <img
                    onClick={() => handleShowImages(index)}
                    src={FormatedUrlImage(image)}
                    alt="imagen"
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
              ))}
            </div>
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
      {modal2 && (
        <ModalImageViewer
          images={inventario.images}
          title={inventarioTitle}
          show={modal2}
          onClose={() => setModal2(false)}
          currentIndex={imageSelected}
          isDownloadImage={true}
        />
      )}
      {loading && <Loading />}
    </div>
  );
};
export default ShowInventory;
