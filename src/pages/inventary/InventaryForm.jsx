import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import CreateInventario from "./CreateInventario";
import EditarInventario from "./EditarInventario";
import { FiChevronRight } from "react-icons/fi";
import { MdSaveAlt } from "react-icons/md";
import { toast } from "react-hot-toast";
import { handleUploadImagesInventary } from "../../api/inventary.api";
import Loading from "../../utils/Loading";

const InventaryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    inventaryTypes,
    inventaryModels,
    inventaryBrands,
    createInventary,
    user,
  } = useContext(Context);

  const [voler, setVoler] = useState(false);
  const [loading, setLoading] = useState(false);
  const notificationError = (message) => toast.error(message);
  const successNotification = (message) => toast.success(message);

  const [data, setData] = useState({
    inventaryTypeId: "",
    otherInventary: "",
    inventaryBrandId: "",
    otherBrand: "",
    inventaryModelId: "",
    otherModel: "",
    serialNumber: "",
    activo: "",
    comments: "",
    status: "",
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (id) console.log(id);
    if (id) {
      setVoler(true);
    } else {
      setVoler(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    console.log(images);
    if (id) {
      console.log("editar inventario");
    } else {
      try {
        let newImages = [];
        if (images.length > 0) {
          newImages = await Promise.all(
            images.map(async (image) => {
              const imageUrl = await handleUploadFile(image);
              return imageUrl;
            })
          );

          const newImagesJSON = JSON.stringify(newImages);

          if (newImagesJSON) {
            setData({ ...data, images: newImagesJSON });
          }
        }

        const res = await createInventary(data, user.token);
        if (res?.status > 299) {
          setLoading(false);
          notificationError("Error al crear el inventario");
          console.log(res);
        }
        successNotification("Inventario creado correctamente");
        // setTimeout(() => {
        //   navigate(`/inventario/editar/${res.id}`);
        // }, 2000);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUploadFile = async (image) => {
    try {
      console.log(image);
      let formData = new FormData();
      formData.append("image", image);
      formData.append("Content-Type", "multipart/form-data");

      const imageRes = await handleUploadImagesInventary(formData, user.token);
      console.log(imageRes);
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
          <Link to="/Inventario" className="text-gray-500 hover:text-gray-700">
            Inventario
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="#" className="text-gray-500 hover:text-gray-700">
            Nuevo inventario
          </Link>
        </div>
        <Link
          to="/inventario"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
        >
          <span>
            <IoArrowBack className="text-white text-lg" />
          </span>
          {voler ? "Cancelar" : "Volver"}
        </Link>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold"></h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
          {id ? (
            <EditarInventario data={data} setData={setData} />
          ) : (
            <CreateInventario
              body={data}
              setBody={setData}
              images={images}
              setImages={setImages}
              inventaryTypes={inventaryTypes}
              inventaryBrands={inventaryBrands}
              inventaryModels={inventaryModels}
            />
          )}
          {/* boton guardar */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
            >
              <span>
                <MdSaveAlt className="text-white text-lg" />
              </span>
              Guardar inventario
            </button>
          </div>
        </form>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default InventaryForm;
