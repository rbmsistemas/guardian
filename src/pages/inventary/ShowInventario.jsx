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

const ShowInventario = () => {
  const { id } = useParams();
  const {
    inventary,
    getInventaryById,
    inventaryTypes,
    inventaryBrands,
    inventaryModels,
    deleteInventary,
  } = useContext(Context);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const errorNotify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  const [imageSelected, setImageSelected] = useState("");

  const handleShowImage = (image) => {
    setImageSelected(image);
    setModal2(true);
  };

  const [inventario, setInventario] = useState({
    id: "",
    inventaryTypeId: "",
    inventaryBrandId: "",
    inventaryModelId: "",
    serialNumber: "",
    activo: "",
    comments: "",
    status: false,
    images: [],
    altaDate: "",
    asignacionDate: null,
    isAsigned: false,
    bajaDate: null,
    createdAt: "",
    updatedAt: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getInventaryById(id);
  }, [id]);

  useEffect(() => {
    if (inventary.id) {
      setInventario({
        id: inventary.id ?? "",
        inventaryTypeId:
          inventaryTypes.find((item) => item.id === inventary.inventaryTypeId)
            ?.name ?? "",
        inventaryBrandId:
          inventaryBrands.find((item) => item.id === inventary.inventaryBrandId)
            ?.name ?? "",
        inventaryModelId:
          inventaryModels.find((item) => item.id === inventary.inventaryModelId)
            ?.name ?? "",
        serialNumber: inventary.serialNumber ?? "",
        activo: inventary.activo ?? "",
        comments: inventary.comments ?? "",
        status: inventary.status ?? false,
        images: Object.entries(inventary?.images) ?? [],
        altaDate: inventary.altaDate ?? "",
        asignacionDate: inventary.asignacionDate ?? null,
        isAsigned: inventary.isAsigned ?? false,
        bajaDate: inventary.bajaDate ?? null,
        createdAt: inventary.createdAt ?? "",
        updatedAt: inventary.updatedAt ?? "",
      });
    }
    setLoading(false);
  }, [inventary]);

  const imageElements = inventario.images?.map(([, link]) => link) ?? [];

  const onDelete = async () => {
    setLoading(true);
    console.log("inventario", inventario);
    const data = await deleteInventary(inventario.id);
    if (!data) {
      errorNotify("Error al eliminar el inventario");
      setModal(false);
      setLoading(false);
      return;
    }

    successNotify("Inventario eliminado correctamente");
    clearInventary();
    setTimeout(() => {
      navigate("/inventario");
    }, 500);
    setModal(false);
    setLoading(false);
  };
  const clearInventary = () => {
    setInventario({
      id: "",
      inventaryTypeId: "",
      inventaryBrandId: "",
      inventaryModelId: "",
      serialNumber: "",
      activo: "",
      comments: "",
      status: false,
      images: [],
      altaDate: "",
      asignacionDate: null,
      isAsigned: false,
      bajaDate: null,
      createdAt: "",
      updatedAt: "",
    });
  };

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
          <Link to="#" className="text-gray-500 hover:text-gray-700">
            {inventario.inventaryTypeId + " " + inventario.inventaryBrandId}
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Link
            to="/inventario"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <FaList className="text-white text-lg" />
            </span>
            Ir al listado
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
              <Label htmlFor="inventaryTipe" value="Tipo de inventario" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <BiDevices className="text-gray-500 text-xl" />
              </span>
              {inventario.inventaryTypeId}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="inventaryBrand" value="Marca" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <MdNewReleases className="text-gray-500 text-xl" />
              </span>
              {inventario.inventaryBrandId}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="inventaryMode" value="Modelo" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <Tb3DCubeSphere className="text-gray-500 text-xl" />
              </span>
              {inventario.inventaryModelId}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="sn" value="Número Serial" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <AiOutlineFieldNumber className="text-gray-500 text-xl" />
              </span>
              {inventario.serialNumber}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="activo" value="Activo" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <AiOutlineNumber className="text-gray-500 text-xl" />
              </span>
              {inventario.activo}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="" value="Activo" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <MdOutlineCategory className="text-gray-500 text-xl" />
              </span>
              {inventario.status ? "Alta" : "Baja"}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="asignacionDate" value="Estado de asignación" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <FaUserCheck className="text-gray-500 text-xl" />
              </span>
              {inventario.isAsigned ? "Asignado" : "Sin asignar"}
            </p>
          </div>
          {inventario.isAsigned && (
            <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
              <div className="w-full">
                <Label htmlFor="asignacionDate" value="Fecha de asignación" />
              </div>
              <p className="text-gray-500 flex items-center gap-4">
                <span>
                  <MdCalendarMonth className="text-gray-500 text-xl" />
                </span>
                {inventario.asignacionDate
                  ? formatLocalDate(inventario.asignacionDate)
                  : "N/A"}
              </p>
            </div>
          )}
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="altaDate" value="Fecha de alta" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <MdCalendarMonth className="text-gray-500 text-xl" />
              </span>
              {formatLocalDate(inventario.altaDate)}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="bajaDate" value="Fecha de baja" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <MdCalendarMonth className="text-gray-500 text-xl" />
              </span>
              {inventario.bajaDate
                ? formatLocalDate(inventario.bajaDate)
                : "N/A"}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="createdAt" value="Fecha de creación" />
              <p className="text-gray-500 flex items-center gap-4">
                <span>
                  <MdCalendarMonth className="text-gray-500 text-xl" />
                </span>
                {formatLocalDate(inventario.createdAt)}
              </p>
            </div>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="updatedAt" value="Ultima modificación" />
              <p className="text-gray-500 flex items-center gap-4">
                <span>
                  <MdCalendarMonth className="text-gray-500 text-xl" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {imageElements.map((image, index) => (
                <div
                  key={index}
                  className="col-span-1 rounded-md flex items-center justify-center border border-gray-300 p-3 cursor-pointer"
                >
                  <img
                    onClick={() => handleShowImage(image)}
                    src={image}
                    alt="imagen"
                    className="w-full h-full object-cover rounded-md"
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
                {inventario.inventaryTypeId +
                  " " +
                  inventario.inventaryBrandId +
                  " Modelo " +
                  inventario.inventaryModelId +
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
        <Modal
          title="Ver imagen"
          dismissible={true}
          size={"4xl"}
          onClose={() => {
            setModal2(false);
          }}
          show={modal2}
        >
          <Modal.Header>
            <div className="flex gap-2 items-center">
              <span className="bg-blue-500 rounded-full p-2">
                <FaImage className="text-white text-xl" />
              </span>
              <p className="text-xl font-bold text-blue-500">Ver imagen</p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="flex justify-center items-center">
              <img
                src={imageSelected}
                alt={imageSelected}
                className="w-full h-96 rounded-lg"
              />
            </div>
          </Modal.Body>
        </Modal>
      )}
      {loading && <Loading />}
    </div>
  );
};
export default ShowInventario;
