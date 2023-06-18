import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import {
  FaCheck,
  FaEnvelope,
  FaHome,
  FaList,
  FaMapMarkerAlt,
  FaPhone,
  FaRegEdit,
  FaRegTrashAlt,
  FaStore,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Label, Modal } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { AiOutlinePoweroff } from "react-icons/ai";
import { toast } from "react-hot-toast";
import Loading from "../../utils/Loading";
import "../../utils/Wyswyg.css";

const VerProovedores = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { provider, getProvider, deleteProvider, clearProvider } =
    useContext(Context);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [proveedor, setProveedor] = useState({
    proveedor: "",
    encargado: "",
    email: "",
    phone: "",
    address: "",
    logo: "",
    status: "",
    comments: "",
  });

  useEffect(() => {
    if (id) {
      getProvider(id);
    }
  }, [id]);

  useEffect(() => {
    if (provider) {
      setProveedor({
        id: provider.id || "",
        proveedor: provider.proveedor || "",
        encargado: provider.encargado || "",
        email: provider.email || "",
        phone: provider.phone || "",
        address: provider.address || "",
        logo: provider.logo || "",
        status: provider.status || true,
        comments: provider.comments || "",
      });
    }
  }, [provider]);

  const errorNotify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  const onDelete = async () => {
    setLoading(true);
    console.log("proveedor", proveedor);
    const data = await deleteProvider(proveedor.id);
    if (!data) {
      errorNotify("Error al eliminar el proveedor");
      setModal(false);
      setLoading(false);
      return;
    }

    successNotify("Proveedor eliminado correctamente");
    clearProvider();
    setTimeout(() => {
      navigate("/proveedores");
    }, 500);
    setModal(false);
    setLoading(false);
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
          <Link to="/proveedores" className="text-gray-500 hover:text-gray-700">
            Proveedores
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="#" className="text-gray-500 hover:text-gray-700">
            {proveedor.proveedor}
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {/* volver al listado */}
          <Link
            to="/proveedores"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <FaList className="text-white text-lg" />
            </span>
            Ir al listado
          </Link>

          <Link
            to={`/proveedores/editar/${id}`}
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
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 flex justify-center items-center">
            <img
              src={proveedor.logo}
              alt={proveedor.proveedor}
              className="w-44 h-auto border border-gray-300 "
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="proveedor" value="Proveedor" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <FaStore className="text-gray-500 text-xl" />
              </span>
              {proveedor.proveedor}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="encargado" value="Encargado" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <FaUser className="text-gray-500 text-xl" />
              </span>
              {proveedor.encargado}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="email" value="Correo electrónico" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <FaEnvelope className="text-gray-500 text-xl" />
              </span>
              {proveedor.email}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="phone" value="Teléfono" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <FaPhone className="text-gray-500 text-xl" />
              </span>
              {proveedor.phone}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="address" value="Dirección" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <FaMapMarkerAlt className="text-gray-500 text-xl" />
              </span>
              {proveedor.address}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="status" value="Estado" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <AiOutlinePoweroff className="text-gray-500 text-xl" />
              </span>
              {proveedor.status ? "Activo" : "Inactivo"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="comments" value="Comentarios" />
            </div>
            <div
              className="text-gray-500 min-h-[15vh]"
              dangerouslySetInnerHTML={{ __html: proveedor.comments }}
            ></div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          title="Eliminar proveedor"
          dismissible={true}
          onClose={() => {
            setModal(false);
          }}
          show={modal}
        >
          <Modal.Header>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-500 rounded-full">
                <FaStore className="text-white text-xl" />
              </span>
              <p className="text-xl font-bold text-red-500">
                Eliminar proveedor
              </p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <p className="text-gray-500">
              ¿Está seguro que desea eliminar el proveedor{" "}
              <span className="font-bold">{proveedor.proveedor}</span>?
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

export default VerProovedores;
