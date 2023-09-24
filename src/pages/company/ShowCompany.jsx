import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import {
  FaCheck,
  FaEnvelope,
  FaHome,
  FaList,
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
import { Base_Company } from "../../context/Models";
import { FormatedUrlImage } from "../../utils/FormatedUrlImage";
import ModalImageViewer from "../../components/modals/ModalImageViewer";

const ShowCompany = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { company, getCompany, deleteProvider, clearProvider } =
    useContext(Context);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState(Base_Company);

  useEffect(() => {
    if (id) {
      getCompany(id);
    }
  }, [id]);

  useEffect(() => {
    if (company) {
      setCompanyData({
        id: company.id || "",
        name: company.name || "",
        manager: company.manager || "",
        email: company.email || "",
        phone: company.phone || "",
        logo: company.logo || "",
        status: company.status || true,
        comments: company.comments || "",
      });
    }
  }, [company]);

  const errorNotify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  const onDelete = async () => {
    setLoading(true);
    const data = await deleteProvider(companyData.id);
    if (!data) {
      errorNotify("Error al eliminar el companyData");
      setModal(false);
      setLoading(false);
      return;
    }

    successNotify("Proveedor eliminado correctamente");
    clearProvider();
    setTimeout(() => {
      navigate("/companies");
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
          <Link to="/companies" className="text-gray-500 hover:text-gray-700">
            Compañias
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="#" className="text-gray-500 hover:text-gray-700">
            {companyData.companyData}
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {/* volver al listado */}
          <Link
            to="/companies"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <FaList className="text-white text-lg" />
            </span>
            Listado
          </Link>

          <Link
            to={`/companies/editar/${id}`}
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
              src={FormatedUrlImage(companyData.logo)}
              alt={companyData.name}
              className="w-44 h-auto border border-gray-300 cursor-zoom-in"
              onClick={() => setModal2(true)}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="nombre" value="Comañia" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <FaStore className="text-gray-500 text-xl" />
              </span>
              {companyData.name}
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="manager" value="Encargado" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <FaUser className="text-gray-500 text-xl" />
              </span>
              {companyData.manager}
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
              {companyData.email}
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
              {companyData.phone}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2 border-b border-b-gray-300">
            <div className="w-full">
              <Label htmlFor="status" value="Estado" />
            </div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>
                <AiOutlinePoweroff className="text-gray-500 text-xl" />
              </span>
              {companyData.status ? "Activo" : "Inactivo"}
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
              dangerouslySetInnerHTML={{ __html: companyData.comments }}
            ></div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          title="Eliminar companyData"
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
                Eliminar companyData
              </p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <p className="text-gray-500">
              ¿Está seguro que desea eliminar el companyData{" "}
              <span className="font-bold">{companyData.companyData}</span>?
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
          images={[companyData.logo]}
          isDownloadImage
          show={modal2}
          title={companyData.name}
          onClose={() => setModal2(false)}
        />
      )}
      {loading && <Loading />}
    </div>
  );
};

export default ShowCompany;
