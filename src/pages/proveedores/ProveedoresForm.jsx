import React, { useContext, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import EditarProveedores from "./EditarProveedores";
import CrearProveedores from "./CrearProveedores";
import Loading from "../../utils/Loading";
import { toast } from "react-hot-toast";
import Context from "../../context/Context";
import { uploadImageProviders } from "../../api/request.api";

const ProveedoresForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { createProvider, user, updateProvider, provider, getProvider } =
    useContext(Context);
  const [proveedor, setProveedor] = useState({
    proveedor: "",
    encargado: "",
    email: "",
    phone: "",
    address: "",
    logo: "",
    status: true,
    comments: "",
  });

  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const notificationError = (message) => toast.error(message);
  const successNotification = (message) => toast.success(message);

  useEffect(() => {
    if (id) {
      getProvider(id);
    }
  }, [id]);

  useEffect(() => {
    if (provider) {
      setProveedor({
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (id) {
      try {
        const newImage = await handleUploadFile();
        const newProvider = {
          ...proveedor,
          logo: newImage,
        };

        console.log(newProvider);
        const res = await updateProvider(id, newProvider, user.token);
        if (res?.status > 299) {
          notificationError("Error al actualizar al proveedor");
          return console.log(res);
        }
        console.log("res:", res);
        successNotification("Proveedor actualizado correctamente");
        setTimeout(() => {
          navigate(`/proveedores/editar/${id}`);
        }, 2000);
        setLoading(false);
      } catch (error) {
        console.log(error);
        notificationError("Error al actualizar la imagen");
      }
    } else {
      const res = await createProvider(proveedor);

      if (res?.status > 299) {
        notificationError("Error al crear al proveedor");
        return console.log(res.data.message);
      }
      successNotification("Proveedor creado correctamente");
      setTimeout(() => {
        navigate(`/proveedores/editar/${res.id}`);
      }, 2000);
      setLoading(false);
    }
  };

  const handleUploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const imageRes = await uploadImageProviders(formData, user.token);
      if (imageRes?.status > 299) {
        setLoading(false);
        notificationError("Error al actualizar la imagen");
        console.log(imageRes);
      }
      return imageRes.data;
    } catch (error) {
      console.log(error);
      notificationError("Error al actualizar la imagen");
    }
  };

  return (
    <div className="min-h-full h-auto w-full p-5">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center">
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
            Nuevo proveedor
          </Link>
        </div>
        <Link
          to="/proveedores"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
        >
          <span>
            <IoArrowBack className="text-white text-lg" />
          </span>
          Cancelar
        </Link>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold"></h2>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 mt-5 bg-white p-3 rounded-lg"
        >
          <CrearProveedores
            proveedor={proveedor}
            setProveedor={setProveedor}
            image={image}
            setImage={setImage}
          />
        </form>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default ProveedoresForm;
