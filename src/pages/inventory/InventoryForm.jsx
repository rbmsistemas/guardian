import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import { FaEye, FaHome, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import InventoryFields from "./InventoryFields";
import { FiChevronRight } from "react-icons/fi";
import { MdSaveAlt } from "react-icons/md";
import { toast } from "react-hot-toast";
import Loading from "../../utils/Loading";
import { uploadImagesInventory } from "../../api/inventory.api";
import { getCurrentFormattedDate } from "../../utils/getFormatedDate";
import { Base_Inventory } from "../../context/Models";

const InventoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    inventoryTypes,
    inventoryModels,
    inventoryBrands,
    createInventory,
    updateInventory,
    getInventoryById,
    getValidatedSerialNumber,
    getValidatedActivo,
    inventory,
    user,
  } = useContext(Context);

  const [voler, setVoler] = useState(false);
  const [loading, setLoading] = useState(false);
  const notificationError = (message) => toast.error(message);
  const successNotification = (message) => toast.success(message);

  const [data, setData] = useState(Base_Inventory());
  const [images, setImages] = useState([]);
  const newInvetoryModels = [
    ...inventoryModels?.map((model) => ({
      value: model.id,
      label: model.name,
    })),
  ];
  const newInventoryBrands = [
    ...inventoryBrands?.map((brand) => ({
      value: brand.id,
      label: brand.name,
    })),
  ];
  const newInventoryTypes = [
    ...inventoryTypes?.map((type) => ({
      value: type.id,
      label: type.name,
    })),
  ];

  useEffect(() => {
    if (id) {
      getInventoryById(id);
      setVoler(true);
    } else {
      setVoler(false);
      setData(Base_Inventory());
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (id && inventory.id) {
      setData(Base_Inventory(inventory, inventoryModels));
      setImages(inventory?.images || []);
    }
  }, [inventory]);

  const compareChanges = (data, inventory) => {
    let changes = false;
    if (!id) {
      return false;
    }
    Object.keys(inventory).forEach((key) => {
      if (data[key] !== inventory[key]) {
        changes = true;
      }
    });
    return changes;
  };

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

        if (data.recepcionDate) {
          setData({
            ...data,
            recepcionDate: new Date(data.recepcionDate),
          });
        }

        if (
          data.serialNumber !== inventory.serialNumber &&
          data.activo !== inventory.activo
        ) {
          let existSN = true;
          if (data.activo) {
            existSN = await handleValidateSerialNumber(
              data.serialNumber,
              data.id
            );
          }
          let existActivo = true;
          if (data.activo) {
            existActivo = await handleValidateActivo(data.activo, data.id);
          }
          if (existSN || existActivo) {
            const res = await updateInventory(
              id,
              {
                ...data,
                images: imagesObject,
                recepcionDate: data.recepcionDate ?? null,
              },
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
          const res = await updateInventory(
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
        sendData = {
          ...sendData,
          bajaDate: getCurrentFormattedDate(),
          altaDate: getCurrentFormattedDate(),
        };

        if (data.recepcionDate) {
          setData({
            ...data,
            recepcionDate: new Date(data.recepcionDate),
          });
        } else {
          setData({
            ...data,
            recepcionDate: null,
          });
        }

        if (data.status === true) {
          sendData = {
            ...sendData,
            bajaDate: null,
          };
        }

        let existSN = true;
        if (data.activo) {
          existSN = await handleValidateSerialNumber(data.serialNumber);
        }
        let existActivo = true;
        if (data.activo) {
          existActivo = await handleValidateActivo(data.activo);
        }
        if (existSN || existActivo) {
          const res = await createInventory(sendData, user.token);
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

              const response = await updateInventory(
                res?.inventory?.id,
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
              setData(Base_Inventory());
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

      const imageRes = await uploadImagesInventory(formData, user.token);
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

  const handleSelectInput = (e, type) => {
    if (e === null) {
      return;
    }
    switch (type) {
      case "inventoryModelId":
        if (e?.value === "" || e === "") {
          setData({
            ...data,
            inventoryModelId: "",
            inventoryBrandId: "",
            inventoryTypeId: "",
          });
        } else if (e.value === 0) {
          setData({
            ...data,
            inventoryModelId: e.value,
            inventoryBrandId: "",
            inventoryTypeId: "",
          });
        } else {
          let model = inventoryModels.find((model) => model.id === e.value);
          setData({
            ...data,
            inventoryModelId: e.value,
            inventoryBrandId: model?.inventoryBrandId || "",
            inventoryTypeId: model?.inventoryTypeId || "",
          });
        }
        break;
      case "inventoryBrandId":
        setData({ ...data, inventoryBrandId: e.value });
        break;
      case "inventoryTypeId":
        setData({ ...data, inventoryTypeId: e.value });
        break;
      default:
        break;
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
          <Link to="#" className="text-gray-500 hover:text-gray-700 truncate">
            Nuevo inventario
          </Link>
        </div>
        <div className="flex gap-2 justify-center md:justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <FaSave className="text-white text-lg" />
            </span>

            {id ? "Actualizar" : "Guardar"}
          </button>
          <Link
            to="/inventario"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <IoArrowBack className="text-white text-lg" />
            </span>
            {voler && compareChanges(data, inventory) ? "Cancelar" : "Volver"}
          </Link>
          {id && (
            <Link
              to={`/inventario/ver/${id}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
            >
              <span>
                <FaEye className="text-white text-lg" />
              </span>
              Ver
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col pb-20">
        <h2 className="text-xl font-bold"></h2>
        <form
          onSubmit={handleSubmit}
          className="flex h-full flex-col gap-5 mt-5"
        >
          {id ? (
            <InventoryFields
              body={data}
              setBody={setData}
              images={images}
              setImages={setImages}
              inventoryTypes={newInventoryTypes}
              inventoryBrands={newInventoryBrands}
              inventoryModels={newInvetoryModels}
              handleSelectInput={handleSelectInput}
              titleForm={"Editar inventario"}
            />
          ) : (
            <InventoryFields
              body={data}
              setBody={setData}
              images={images}
              setImages={setImages}
              inventoryTypes={newInventoryTypes}
              inventoryBrands={newInventoryBrands}
              inventoryModels={newInvetoryModels}
              handleSelectInput={handleSelectInput}
              titleForm={"Crear inventario"}
            />
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
            >
              <span>
                <FaSave className="text-white text-lg" />
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

export default InventoryForm;
