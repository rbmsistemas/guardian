import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Context from "../../../context/Context";
import AutocompleteInput from "../../../components/inputs/AutocompleteInput";
import { FaHome, FaLayerGroup, FaThList } from "react-icons/fa";
import TextInput from "../../../components/inputs/TextInput";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FormatedUrlImage } from "../../../utils/FormatedUrlImage";
import ModalImageViewer from "../../../components/modals/ModalImageViewer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Masonry from "react-masonry-css";
import { FiChevronRight } from "react-icons/fi";
import { TbTrash } from "react-icons/tb";
import { RiLayoutMasonryFill } from "react-icons/ri";

const Groups = () => {
  const { getInventoryGroups, inventoryGroups, allInventoryFields } =
    useContext(Context);
  const location = useLocation();
  const [groupType, setGroupType] = useState("");
  const [groupName, setGroupName] = useState("");
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(0);
  const [viewMod, setViewMod] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const name = params.get("name");
    if (name) {
      setGroupName(name);
    }
    if (type) {
      setGroupType(type);
    }
  }, [location]);

  useEffect(() => {
    if (groupType && groupName) {
      getInventoryGroups({ type: groupType, name: groupName });
    } else if (groupType) {
      getInventoryGroups({ type: groupType });
    } else if (groupName) {
      getInventoryGroups({ name: groupName });
    } else {
      getInventoryGroups({});
    }
  }, [groupType, groupName]);

  useEffect(() => {
    if (inventoryGroups) {
      if (localStorage.getItem("viewGroups")) {
        setViewMod(parseInt(localStorage.getItem("viewGroups")));
        handleChangeView(parseInt(localStorage.getItem("viewGroups")));
      } else handleChangeView(0);
    }
  }, [inventoryGroups]);

  const handleShowImages = (index) => {
    setImageSelected(index);
    setModal(true);
  };

  const handleClear = () => {
    setGroupType("");
    setGroupName("");
  };

  const handleChangeView = (view) => {
    localStorage.setItem("viewGroups", view);
    setViewMod(view);
    if (view == 0) {
      const groupImages = inventoryGroups.map((group) => ({
        id: group.id,
        name:
          group?.inventoryModel?.name +
            " " +
            group?.inventoryModel?.inventoryBrand?.name +
            (group.serialNumber ? " - SN " + group.serialNumber : "") ||
          "Grupo",
        images: group.images,
      }));
      setImages(groupImages);
    } else {
      const groupImages = inventoryGroups.map((group) =>
        group?.images?.map((image) => ({
          id: group.id,
          name:
            group?.inventoryModel?.name +
              " " +
              group?.inventoryModel?.inventoryBrand?.name +
              (group.serialNumber ? " - SN " + group.serialNumber : "") ||
            "Grupo",
          image: image,
        }))
      );
      const reducer = groupImages.reduce((acc, val) => acc.concat(val), []);
      setImages(reducer);
    }
  };

  return (
    <div className="w-full h-full p-5 pb-20">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center pb-4">
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
        </div>
      </div>
      <div className="w-full h-full rounded-lg flex flex-col gap-2 bg-white overflow-y-auto relative">
        <div className="p-3 pb-0">
          <h2 className="text-2xl font-semibold text-blue-500">Mis grupos</h2>
          <p className="text-gray-600">
            Usa este espacio para agrupar tus inventarios de una manera mas
            sencilla a partir de caracteristicas similares.
          </p>
        </div>
        <div className="w-full p-3 shadow-md rounded-md sticky top-0 bg-white z-30">
          <div className="w-full flex justify-between items-center pb-2">
            <p className="text-blue-800 font-semibold pb-2">Buscar grupo</p>
            <Link
              onClick={handleClear}
              to={"/inventario/grupos"}
              className="text-gray-400 border py-2 px-3 rounded-md hover:text-red-600 transition-all ease-in-out duration-200 flex items-center gap-2"
            >
              <span className="text-xl">
                <TbTrash />
              </span>{" "}
              Limpiar
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 uppercase">
            <AutocompleteInput
              id="groupType"
              data={allInventoryFields?.map((item) => ({
                value: item.id,
                label: item?.name ?? item?.key,
              }))}
              placeholder="Buscar grupo"
              onChange={(value) => {
                setGroupType(value.label);
              }}
              icon={FaLayerGroup}
              value={groupType}
              isClearable
              className={"uppercase text-red-500 "}
            />
            <TextInput
              placeholder="Nombre del grupo"
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
              value={groupName}
              icon={MdDriveFileRenameOutline}
              isClearable
            />
          </div>
          {inventoryGroups?.length > 0 && (
            <p className="text-gray-600 pt-2 text-right">
              {inventoryGroups.length} registros encontrados para
              {groupType || groupName
                ? ` "${groupType} ${groupName}"`
                : " en tu inventario"}
            </p>
          )}
        </div>
        <div className="w-full p-3">
          {inventoryGroups?.length > 0 ? (
            <div className="w-full flex justify-end items-center gap-2">
              <button
                onClick={() => handleChangeView(0)}
                className={`border p-2 rounded-md transition-all ease-in-out duration-100 ${
                  viewMod == 0
                    ? "bg-purple-500 hover:bg-purple-700 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }}`}
              >
                <FaThList
                  className={`text-xl ${viewMod == 0 ? "text-white" : ""}`}
                />
              </button>
              <button
                onClick={() => handleChangeView(1)}
                className={`border p-2 rounded-md transition-all ease-in-out duration-100 ${
                  viewMod == 1
                    ? "bg-purple-500 hover:bg-purple-700 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }}`}
              >
                <RiLayoutMasonryFill
                  className={`text-xl ${viewMod == 1 ? "text-white" : ""}`}
                />
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <p className="text-gray-500 text-xl">No hay grupos</p>
            </div>
          )}
        </div>
        {inventoryGroups && viewMod == 0 ? (
          <>
            <div className="w-full p-3">
              {images &&
                images.length > 0 &&
                images.map((image) => (
                  <div key={image.id} className="w-full pb-4">
                    <Link
                      to={"/inventario/ver/" + image.id}
                      className="text-left text-blue-600 hover:underline hover:text-blue-800 font-semibold transition-all ease-in-out duration-200"
                    >
                      {image.name}
                    </Link>
                    <Masonry
                      breakpointCols={{
                        default: 5,
                        1100: 4,
                        700: 3,
                        500: 2,
                      }}
                      className="my-masonry-grid"
                      columnClassName="my-masonry-grid_column"
                    >
                      {image.images.map((image, index) => (
                        <div
                          key={index}
                          className="my-masonry-grid_column"
                          style={{ marginBottom: "10px" }}
                        >
                          <LazyLoadImage
                            effect="blur"
                            onClick={() => handleShowImages(index)}
                            src={FormatedUrlImage(image)}
                            alt="imagen"
                            className="w-full h-auto object-cover rounded-md cursor-pointer aspect-square"
                          />
                        </div>
                      ))}
                    </Masonry>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="w-full p-3">
            <Masonry
              breakpointCols={{
                default: 5,
                1100: 4,
                700: 3,
                500: 2,
              }}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {images &&
                images.length > 0 &&
                images.map((image, index) => (
                  <div key={index} className="w-full">
                    <LazyLoadImage
                      effect="blur"
                      onClick={() => handleShowImages(index)}
                      src={FormatedUrlImage(image.image)}
                      alt="imagen"
                      className="w-full h-auto object-cover rounded-md cursor-pointer aspect-square"
                    />
                  </div>
                ))}
            </Masonry>
          </div>
        )}
      </div>
      {modal && (
        <ModalImageViewer
          images={
            viewMod == 0
              ? images?.map((image) => image.images)?.flat() ?? []
              : images?.map((image) => image.image) ?? []
          }
          title={groupName || groupType || "Grupo"}
          show={modal}
          onClose={() => setModal(false)}
          currentIndex={imageSelected}
          isDownloadImage={true}
        />
      )}
    </div>
  );
};

export default Groups;
