import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Context from "../../../context/Context";
import AutocompleteInput from "../../../components/inputs/AutocompleteInput";
import {
  FaCheckSquare,
  FaHome,
  FaLayerGroup,
  FaRegSquare,
  FaTable,
  FaThList,
} from "react-icons/fa";
import TextInput from "../../../components/inputs/TextInput";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FormatedUrlImage } from "../../../utils/FormatedUrlImage";
import ModalImageViewer from "../../../components/modals/ModalImageViewer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Masonry from "react-masonry-css";
import { FiChevronRight } from "react-icons/fi";
import { TbTableFilled, TbTrash } from "react-icons/tb";
import { RiLayoutMasonryFill } from "react-icons/ri";
import CustomeTable from "../../../components/table/CustomeTable";
import { formatLocalDate } from "../../../utils/getFormatedDate";
import { AppUrl } from "../../../api/inventory.api";
import toast from "react-hot-toast";
import ImageDownloader from "../../../exports/ImageDownloader";

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
  const [totals, setTotals] = useState({ totalEntries: 0, totalPages: 0 });
  const [inventoryTableView, setInventoryTableView] = useState([]);
  const [selectImagesGroup, setSelectImagesGroup] = useState([]);

  const successNotify = (msg) => toast.success(msg);

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
      getInventoryGroups([]);
    }
    setSelectImagesGroup([]);
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
    } else if (view == 1) {
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
    } else if (view == 2) {
      let tableValues = inventoryGroups?.map((item, index) => {
        return {
          no: {
            key: "id",
            value: index + 1,
          },
          tipo: {
            key: "inventoryTypeId",
            value: item?.inventoryModel?.inventoryType?.name,
          },
          marca: {
            key: "inventoryBrandId",
            value: item?.inventoryModel?.inventoryBrand?.name,
          },
          modelo: { key: "inventoryModelId", value: item.inventoryModel?.name },
          SN: {
            key: "serialNumber",
            value: item.serialNumber?.length > 0 ? item.serialNumber : "N/A",
          },
          activo: {
            key: "activo",
            value: item.activo?.length > 0 ? item.activo : "N/A",
          },
          status: { key: "status", value: item.status },
          creacion: {
            key: "createdAt",
            value: formatLocalDate(item.createdAt),
          },
          id: { key: "id", value: item.id },
        };
      });

      setInventoryTableView(tableValues);
      setTotals({
        totalEntries: inventoryGroups.length,
        totalPages: Math.ceil(inventoryGroups.length / 10),
      });
    }
    setSelectImagesGroup([]);
  };

  const handleCopyToClipboard = (id) => {
    const inventory = inventoryGroups.find((item) => item.id === id);
    const inventoryType = inventory?.inventoryModel?.inventoryType?.name;
    const inventoryBrand = inventory?.inventoryModel?.inventoryBrand?.name;
    const inventoryModel = inventory?.inventoryModel?.name;
    const serialNumber = inventory.serialNumber;
    const activo = inventory.activo;
    const status = inventory.status;
    const createdAt = formatLocalDate(inventory.createdAt);
    const updatedAt = formatLocalDate(inventory.updatedAt);

    const stringToCopy = `Tipo: ${inventoryType}\nMarca: ${inventoryBrand}\nModelo: ${inventoryModel}\nSN: ${serialNumber}\nActivo: ${activo}\nStatus: ${
      status === 1 ? "Alta" : status === 2 ? "Propuesta de Baja" : "Baja"
    }\nCreado: ${createdAt}\nActualizado: ${updatedAt}\n\n ${AppUrl}/inventario/ver/${id}`;
    navigator.clipboard.writeText(stringToCopy);
    successNotify("Inventario copiado al portapapeles");
  };

  const handleSelectImagesGroup = (image) => {
    if (selectImagesGroup.includes(image)) {
      setSelectImagesGroup(selectImagesGroup.filter((item) => item !== image));
    } else {
      setSelectImagesGroup([...selectImagesGroup, image]);
    }
  };

  const handleSelectAllImagesGroup = (groupImages) => {
    const groupImagesSelected = groupImages.every((image) =>
      selectImagesGroup.includes(image)
    );

    if (groupImagesSelected) {
      const newSelectedImages = selectImagesGroup.filter(
        (image) => !groupImages.includes(image)
      );
      setSelectImagesGroup(newSelectedImages);
    } else {
      const newSelectedImages = Array.from(
        new Set([...selectImagesGroup, ...groupImages])
      );
      setSelectImagesGroup(newSelectedImages);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-100px)] p-5">
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
          <p className="text-gray-600 text-xs md:text-sm">
            Usa este espacio para agrupar tus inventarios de una manera mas
            sencilla a partir de caracteristicas similares.
          </p>
        </div>
        <div className="w-full p-3 pt-0 shadow-md rounded-md sticky top-0 bg-white z-30">
          <div className="w-full flex justify-between items-center pb-2">
            <p className="text-blue-800 font-semibold pb-2">Buscar grupo</p>
            <Link
              onClick={handleClear}
              to={"/inventario/grupos"}
              className="text-gray-600 text-xs md:text-sm border py-2 px-3 rounded-md hover:text-red-600 hover:border-red-600 transition-all ease-in-out duration-200 flex items-center gap-2"
            >
              <span className="text-base md:text-lg">
                <TbTrash />
              </span>{" "}
              Limpiar
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 uppercase">
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
            <p className="text-gray-600 pt-1 text-right text-xs">
              {inventoryGroups.length} registros encontrados para
              {groupType || groupName
                ? ` "${groupType} ${groupName}"`
                : " en tu inventario"}
            </p>
          )}
        </div>
        <div className="w-full px-3">
          {inventoryGroups?.length > 0 ? (
            <div className="w-full flex justify-end items-center gap-2">
              {selectImagesGroup.length > 0 && (
                <div className="border border-green-500 text-xl p-2 rounded-md transition-all ease-in-out duration-100 text-green-500 hover:bg-green-600 hover:text-white flex items-center gap-2">
                  <ImageDownloader imageUrls={selectImagesGroup} />
                </div>
              )}
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
              <button
                onClick={() => handleChangeView(2)}
                className={`border p-2 rounded-md transition-all ease-in-out duration-100 ${
                  viewMod == 2
                    ? "bg-purple-500 hover:bg-purple-700 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }}`}
              >
                <FaTable
                  className={`text-xl ${viewMod == 2 ? "text-white" : ""}`}
                />
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <p className="text-gray-500 text-xl">No hay grupos</p>
            </div>
          )}
        </div>
        {inventoryGroups && viewMod == 0 && (
          <>
            <div className="w-full p-3 relative">
              {images &&
                images.length > 0 &&
                images.map((image) => (
                  <div key={image.id} className="w-full pb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center gap-2 p-2 rounded-md transition-all ease-in-out duration-100 ${
                          image?.images?.every((item) =>
                            selectImagesGroup?.includes(item)
                          )
                            ? "bg-blue-500"
                            : "bg-white"
                        }`}
                      >
                        {image?.images?.every((item) =>
                          selectImagesGroup?.includes(item)
                        ) ? (
                          <FaCheckSquare
                            onClick={() =>
                              handleSelectAllImagesGroup(image?.images ?? [])
                            }
                            className="text-xl cursor-pointer text-white"
                          />
                        ) : (
                          <FaRegSquare
                            onClick={() =>
                              handleSelectAllImagesGroup(image?.images ?? [])
                            }
                            className="text-xl cursor-pointer"
                          />
                        )}
                      </div>
                      <Link
                        to={"/inventario/ver/" + image.id}
                        className="text-left text-blue-600 hover:underline hover:text-blue-800 font-semibold transition-all ease-in-out duration-200"
                      >
                        {image.name}
                      </Link>
                    </div>
                    <Masonry
                      breakpointCols={{
                        default: 5,
                        1100: 4,
                        700: 3,
                        500: 2,
                      }}
                      className="my-masonry-grid relative"
                      columnClassName="my-masonry-grid_column"
                    >
                      {image.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-full hover:shadow-md hover:shadow-indigo-500/50 p-2 rounded overflow-hidden transition-all ease-in-out duration-100"
                        >
                          <div
                            className={
                              "absolute top-0 right-0 z-10 flex items-center gap-2 p-2 rounded-md transition-all ease-in-out duration-100 " +
                              (selectImagesGroup.includes(image)
                                ? "bg-blue-500"
                                : "bg-white")
                            }
                          >
                            {selectImagesGroup.includes(image) ? (
                              <FaCheckSquare
                                onClick={() => handleSelectImagesGroup(image)}
                                className="text-xl cursor-pointer text-white"
                              />
                            ) : (
                              <FaRegSquare
                                onClick={() => handleSelectImagesGroup(image)}
                                className="text-xl cursor-pointer"
                              />
                            )}
                          </div>
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
        )}
        {inventoryGroups && viewMod == 1 && (
          <div className="w-full p-3 relative">
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 p-2 rounded-md transition-all ease-in-out duration-100 ${
                  images.length == selectImagesGroup.length
                    ? "bg-blue-500"
                    : "bg-white"
                }`}
              >
                {images.length == selectImagesGroup.length ? (
                  <FaCheckSquare
                    onClick={() => {
                      const allImages = images?.map((item) => item.image);
                      handleSelectAllImagesGroup(allImages);
                    }}
                    className="text-xl cursor-pointer text-white"
                  />
                ) : (
                  <FaRegSquare
                    onClick={() => {
                      const allImages = images?.map((item) => item.image);
                      handleSelectAllImagesGroup(allImages);
                    }}
                    className="text-xl cursor-pointer"
                  />
                )}
              </div>
              <p className="text-left text-blue-600 hover:underline hover:text-blue-800 font-semibold transition-all ease-in-out duration-200">
                {groupType + " " + groupName ||
                  groupName ||
                  groupType ||
                  "Grupo"}
              </p>
            </div>
            <Masonry
              breakpointCols={{
                default: 5,
                1100: 4,
                700: 3,
                500: 2,
              }}
              className="my-masonry-grid relative"
              columnClassName="my-masonry-grid_column"
            >
              {images &&
                images.length > 0 &&
                images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full hover:shadow-md hover:shadow-indigo-500/50 p-2 rounded overflow-hidden transition-all ease-in-out duration-100"
                  >
                    <div
                      className={
                        "absolute top-0 right-0 z-10 flex items-center gap-2 p-2 rounded-md transition-all ease-in-out duration-100 " +
                        (selectImagesGroup.includes(image?.image)
                          ? "bg-blue-500"
                          : "bg-white")
                      }
                    >
                      {selectImagesGroup.includes(image?.image) ? (
                        <FaCheckSquare
                          onClick={() => handleSelectImagesGroup(image?.image)}
                          className="text-xl cursor-pointer text-white"
                        />
                      ) : (
                        <FaRegSquare
                          onClick={() => handleSelectImagesGroup(image?.image)}
                          className="text-xl cursor-pointer"
                        />
                      )}
                    </div>
                    <LazyLoadImage
                      effect="blur"
                      onClick={() => handleShowImages(index)}
                      src={FormatedUrlImage(image?.image)}
                      alt="imagen"
                      className="w-full h-auto object-cover rounded-md cursor-pointer aspect-square"
                    />
                  </div>
                ))}
            </Masonry>
          </div>
        )}
        {inventoryGroups && viewMod == 2 && (
          <div className="w-full px-3">
            <CustomeTable
              data={inventoryTableView}
              onShare={(id) => handleCopyToClipboard(id)}
              onShow={"/inventario/ver/"}
              onEdit={"/inventario/editar/"}
              quantityResults={10}
              sortByHeader
              totalEntries={totals.totalEntries}
              totalPages={totals.totalPages}
              // setQuantityResults={(quantityResults) =>
              //   handleFilterByParams(quantityResults, "quantityResults")
              // }
              // setPage={(page) => handleFilterByParams(page, "page")}
              // page={filters.page}
              // onSortFilters={(sort) => handleFilterByParams(sort, "orderBy")}
              // order={{ orderBy: filters.orderBy, sort: filters.sort }}
              // exportResults
              // resultsToExport={resultsToExport}
              // setResultsToExport={setresultsToExport}
            />
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
