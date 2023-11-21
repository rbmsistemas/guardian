import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Context from "../../../context/Context";
import AutocompleteInput from "../../../components/inputs/AutocompleteInput";
import { FaHome, FaLayerGroup } from "react-icons/fa";
import TextInput from "../../../components/inputs/TextInput";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FormatedUrlImage } from "../../../utils/FormatedUrlImage";
import ModalImageViewer from "../../../components/modals/ModalImageViewer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Masonry from "react-masonry-css";
import { FiChevronRight } from "react-icons/fi";
import { TbTrash } from "react-icons/tb";

const Groups = () => {
  const { getInventoryGroups, inventoryGroups, allInventoryFields } =
    useContext(Context);
  const location = useLocation();
  const [groupType, setGroupType] = useState("");
  const [groupName, setGroupName] = useState("");
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(0);

  useEffect(() => {
    let params = {};
    if (groupType) {
      params = { ...params, type: groupType };
    } else params = { ...params, type: "" };
    if (groupName) {
      params = { ...params, name: groupName };
    } else params = { ...params, name: "" };
    getInventoryGroups(params);
  }, [groupType, groupName]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const name = params.get("name");
    if (type || name) {
      setGroupType(type);
      setGroupName(name);
    }
  }, [location]);

  useEffect(() => {
    if (inventoryGroups) {
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
    }
  }, [inventoryGroups]);

  const handleShowImages = (index) => {
    setImageSelected(index);
    setModal(true);
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
      <div className="w-full h-full rounded-lg flex flex-col gap-4 bg-white p-5 overflow-y-auto">
        <div className="pb-2">
          <h2 className="text-2xl font-semibold text-blue-500">Mis grupos</h2>
          <p className="text-gray-400">Aquí puedes administrar tus grupos</p>
        </div>
        <div className="w-full p-2 border rounded-md">
          <div className="w-full flex justify-between items-center pb-2">
            <p className="text-blue-800 font-semibold pb-2">Buscar grupo</p>
            <Link
              to={"/inventario/grupos"}
              className="text-gray-400 hover:text-gray-600 transition-all ease-in-out duration-200 flex items-center gap-2"
            >
              <span className="text-sm">
                <TbTrash />
              </span>{" "}
              Limpiar
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 uppercase">
            <AutocompleteInput
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
            <p className="text-gray-400 py-3 text-right">
              {inventoryGroups.length} registros encontrados para
              {groupType || groupName
                ? ` "${groupType} ${groupName}"`
                : " en tu inventario"}
            </p>
          )}
        </div>
        {inventoryGroups && (
          <>
            <div className="w-full">
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
                            className="w-full h-auto object-fill rounded-md cursor-pointer"
                          />
                        </div>
                      ))}
                    </Masonry>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
      {modal && (
        <ModalImageViewer
          images={images?.map((image) => image.images)?.flat() ?? []}
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
