import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "../../../context/Context";
import AutocompleteInput from "../../../components/inputs/AutocompleteInput";
import { FaLayerGroup } from "react-icons/fa";
import TextInput from "../../../components/inputs/TextInput";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FormatedUrlImage } from "../../../utils/FormatedUrlImage";
import ModalImageViewer from "../../../components/modals/ModalImageViewer";

const Groups = () => {
  const { getInventoryGroups, inventoryGroups, allInventoryFields } =
    useContext(Context);
  const { type, name } = useParams();
  const [groupType, setGroupType] = useState(type ?? "");
  const [groupName, setGroupName] = useState(name ?? "");
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(0);

  useEffect(() => {
    getInventoryGroups({ type: groupType, name: groupName });
  }, [groupType, groupName]);

  useEffect(() => {
    if (inventoryGroups) {
      const groupImages = inventoryGroups.map((group) => group.images);
      const flattenImages = groupImages?.flat();
      setImages(flattenImages);
    }
  }, [inventoryGroups]);

  const handleShowImages = (index) => {
    setImageSelected(index);
    setModal(true);
  };

  return (
    <div className="w-full h-full p-5">
      <div className="w-full h-full rounded-lg flex flex-col gap-2 bg-white p-5 overflow-y-auto">
        <div className="pb-2">
          <h2 className="text-xl font-semibold">Mis grupos</h2>
          <p className="text-gray-400">Aquí puedes administrar tus grupos</p>
        </div>
        <div className="w-full p-2 border rounded-md">
          <p className="text-blue-800 font-semibold pb-2">Buscar grupo</p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
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
            />
            <TextInput
              placeholder="Nombre del grupo"
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
              value={groupName}
              icon={MdDriveFileRenameOutline}
            />
          </div>
        </div>
        {inventoryGroups && (
          <>
            <p className="text-gray-400">
              {inventoryGroups.length} grupos encontrados para
              {groupType || groupName
                ? ` "${groupType} ${groupName}"`
                : " en tu inventario"}
            </p>
            <div className="w-full grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-4">
              {images &&
                images.length > 0 &&
                images.map((image, index) => (
                  <img
                    key={index}
                    onClick={() => handleShowImages(index)}
                    src={FormatedUrlImage(image)}
                    alt="imagen"
                    className="w-full h-[7rem] min-w-[7rem] object-cover rounded-md cursor-pointer"
                  />
                ))}
            </div>
          </>
        )}
      </div>
      {modal && (
        <ModalImageViewer
          images={images}
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
