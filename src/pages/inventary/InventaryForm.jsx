import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import { FaEye, FaHome } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import CreateInventario from "./CreateInventario";
import EditarInventario from "./EditarInventario";
import { FiChevronRight } from "react-icons/fi";
import { MdSaveAlt } from "react-icons/md";
import { toast } from "react-hot-toast";
import Loading from "../../utils/Loading";
import { uploadImagesInventary } from "../../api/inventary.api";
import { getCurrentFormattedDate } from "../../utils/getFormatedDate";

const InventaryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    inventaryTypes,
    inventaryModels,
    inventaryBrands,
    createInventary,
    updateInventary,
    getInventaryById,
    getValidatedSerialNumber,
    getValidatedActivo,
    inventary,
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
    isAsigned: false,
    altaDate: null,
    bajaDate: null,
    asignacionDate: null,
    status: true,
    images: [],
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (id) {
      getInventaryById(id);
      setVoler(true);
    } else {
      setVoler(false);
      setData({
        inventaryTypeId: "",
        otherInventary: "",
        inventaryBrandId: "",
        otherBrand: "",
        inventaryModelId: "",
        otherModel: "",
        serialNumber: "",
        activo: "",
        comments: "",
        isAsigned: false,
        altaDate: null,
        bajaDate: null,
        asignacionDate: null,
        status: true,
        images: [],
      });
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (id && inventary.id) {
      setData({
        id: inventary.id ?? "",
        inventaryTypeId: inventary.inventaryTypeId ?? "",
        inventaryBrandId: inventary.inventaryBrandId ?? "",
        inventaryModelId: inventary.inventaryModelId ?? "",
        serialNumber: inventary.serialNumber ?? "",
        activo: inventary.activo ?? "",
        comments: inventary.comments ?? "",
        status: inventary.status ?? false,
        images: inventary.images ?? [],
        altaDate: inventary.altaDate ?? "",
        asignacionDate: inventary.asignacionDate ?? null,
        isAsigned: inventary.isAsigned ?? false,
        bajaDate: inventary.bajaDate ?? null,
        createdAt: inventary.createdAt ?? "",
        updatedAt: inventary.updatedAt ?? "",
      });
      setImages(
        Object.entries(inventary?.images)?.map(([, link]) => link) ?? []
      );
    }
  }, [inventary]);

  const handleValidateSerialNumber = async (serialNumber, currentId = null) => {
    const res = await getValidatedSerialNumber({ serialNumber, currentId });
    if (res.status === true) {
      return true;
    } else {
      return false;
    }
  };
  const handleValidateActivo = async (activo, currentId = null) => {
    const res = await getValidatedActivo({ activo, currentId });
    if (res.status === true) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (id) {
      try {
        let newImagesJSON = {};
        let imagesObject = [];
        newImagesJSON = await Promise.all(
          images.map(async (image) => {
            if (image instanceof File) {
              const imageUrl = await handleUploadFile(image);
              return imageUrl;
            } else {
              return image;
            }
          })
        );

        newImagesJSON.forEach((imageUrl) => {
          if (imageUrl) {
            imagesObject.push(imageUrl);
          }
        });

        if (data.status === false) {
          setData({ ...data, bajaDate: getCurrentFormattedDate() });
        } else if (data.status === true) {
          setData({
            ...data,
            bajaDate: null,
            altaDate: getCurrentFormattedDate(),
          });
        }

        if (data.isAsigned === false) {
          setData({ ...data, asignacionDate: null });
        } else if (data.isAsigned === true) {
          setData({
            ...data,
            asignacionDate: getCurrentFormattedDate(),
          });
        }
        if (
          data.serialNumber !== inventary.serialNumber &&
          data.activo !== inventary.activo
        ) {
          let existSN = true;
          if (data.activo) {
            console.log("entre a activo update");
            existSN = await handleValidateSerialNumber(
              data.serialNumber,
              data.id
            );
          }
          let existActivo = true;
          if (data.activo) {
            console.log("entre a activo update");
            existActivo = await handleValidateActivo(data.activo, data.id);
          }
          if (existSN || existActivo) {
            const res = await updateInventary(
              id,
              { ...data, images: imagesObject },
              user.token
            );
            if (!res.id) {
              notificationError("Error al actualizar el inventario");
            } else {
              successNotification("Inventario actualizado correctamente");
              setTimeout(() => {
                navigate(`/inventario/editar/${res.id}`);
              }, 2000);
            }
          } else {
            notificationError(
              "El Numero de Serie o Activo ya existe. Verifique la información."
            );
          }
        } else {
          const res = await updateInventary(
            id,
            { ...data, images: imagesObject },
            user.token
          );
          if (!res.id) {
            notificationError("Error al actualizar el inventario");
          } else {
            successNotification("Inventario actualizado correctamente");
            setTimeout(() => {
              navigate(`/inventario/editar/${res.id}`);
            }, 2000);
          }
        }
      } catch (error) {
        console.log(error);
        notificationError("Error al actualizar el inventario");
      }
    } else {
      try {
        let newImagesJSON = {};

        let sendData = {
          ...data,
          images: newImagesJSON,
        };
        // if (data.status === false) {
        //   sendData = {
        //     ...sendData,
        //     bajaDate: getCurrentFormattedDate(),
        //   };
        // } else if (data.status === true) {
        sendData = {
          ...sendData,
          bajaDate: getCurrentFormattedDate(),
          altaDate: getCurrentFormattedDate(),
        };
        // }
        if (data.status === true) {
          sendData = {
            ...sendData,
            bajaDate: null,
          };
        }

        if (data.isAsigned === false) {
          sendData = { ...sendData, asignacionDate: null };
        } else if (data.isAsigned === true) {
          sendData = {
            ...sendData,
            asignacionDate: getCurrentFormattedDate(),
          };
        }
        let existSN = true;
        if (data.activo) {
          console.log("entre a activo update");
          existSN = await handleValidateSerialNumber(data.serialNumber);
        }
        let existActivo = true;
        if (data.activo) {
          console.log("entre a activo");
          existActivo = await handleValidateActivo(data.activo);
        }
        if (existSN || existActivo) {
          const res = await createInventary(sendData, user.token);
          if (!res.status) {
            notificationError("Error al crear el inventario");
          } else {
            let newImages = [];
            if (images.length > 0) {
              newImages = await Promise.all(
                images.map(async (image) => {
                  const imageUrl = await handleUploadFile(image);
                  return imageUrl;
                })
              );

              let imagesObject = [];
              newImages.forEach((imageUrl) => {
                if (imageUrl) {
                  imagesObject.push(imageUrl);
                }
              });

              const response = await updateInventary(
                res?.inventary?.id,
                { images: imagesObject },
                user.token
              );
              if (!response.id) {
                notificationError(
                  "Error al cargar las imagenes del inventario."
                );
                console.log(response);
              }
            }
            successNotification("Inventario creado correctamente");
            setTimeout(() => {
              // limpiar el formulario
              setData({
                inventaryTypeId: "",
                otherInventary: "",
                inventaryBrandId: "",
                otherBrand: "",
                inventaryModelId: "",
                otherModel: "",
                serialNumber: "",
                activo: "",
                comments: "",
                isAsigned: false,
                altaDate: null,
                bajaDate: null,
                asignacionDate: null,
                status: true,
                images: [],
              });
              setImages([]);

              navigate(`/inventario/crear`);
            }, 2000);
          }
        } else {
          notificationError(
            "El Numero de Serie o Activo ya existe. Verifique la información."
          );
        }
      } catch (error) {
        console.log(error);
        notificationError("Error al crear el inventario");
      }
    }
    setLoading(false);
  };

  const handleUploadFile = async (image) => {
    try {
      let formData = new FormData();
      formData.append("image", image);

      const imageRes = await uploadImagesInventary(formData, user.token);
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
        {id && (
          <Link
            to={`/inventario/${id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <FaEye className="text-white text-lg" />
            </span>
            Ver
          </Link>
        )}
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold"></h2>
        <form
          onSubmit={handleSubmit}
          className="flex h-full flex-col gap-5 mt-5"
        >
          {id ? (
            <CreateInventario
              body={data}
              setBody={setData}
              images={images}
              setImages={setImages}
              inventaryTypes={inventaryTypes}
              inventaryBrands={inventaryBrands}
              inventaryModels={inventaryModels}
            />
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
            >
              <span>
                <MdSaveAlt className="text-white text-lg" />
              </span>

              {id ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default InventaryForm;
