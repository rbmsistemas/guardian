import React, { useEffect, useState } from "react";
import { Label, Select } from "flowbite-react";
import {
  MdAdd,
  MdClose,
  MdNewReleases,
  MdOutlineCategory,
  MdOutlineInventory,
} from "react-icons/md";
import CameraComponent from "../../utils/CameraComponent";
import { BiDevices } from "react-icons/bi";
import { AiOutlineFieldNumber, AiOutlineNumber } from "react-icons/ai";
import { Tb3DCubeSphere, TbListDetails } from "react-icons/tb";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AutocompleteInput from "../../components/inputs/AutocompleteInput";
import TextInput from "../../components/inputs/TextInput";
import { Base_InventoryField } from "../../context/Models";

const InventoryFields = ({
  body = {
    inventoryModelId: "",
    otherModel: "",
    inventoryBrandId: "",
    otherBrand: "",
    inventoryTypeId: "",
    otherType: "",
    serialNumber: "",
    activo: "",
    comments: "",
    status: 1,
    images: [],
    altaDate: Date.now(),
    bajaDate: null,
    recepcionDate: null,
    createdBy: "",
  },
  setBody,
  images = [],
  setImages,
  inventoryTypes = [],
  inventoryBrands = [],
  inventoryModels = [],
  inventoryFields = [],
  selectedDetails = [],
  setSelectedDetails,
  titleForm,
  handleSelectInput,
}) => {
  useEffect(() => {
    if (body.inventoryTypeId != "0") setBody({ ...body, otherType: "" });
    if (body.inventoryBrandId != "0") setBody({ ...body, otherBrand: "" });
    if (body.inventoryModelId != "0") setBody({ ...body, otherModel: "" });
  }, [body.inventoryTypeId, body.inventoryBrandId, body.inventoryModelId]);

  const [showData, setShowData] = useState("general");

  const handleOtherField = (e) => {
    if (e) {
      if (e?.value == "0") {
        setSelectedDetails([
          ...selectedDetails,
          { id: e.value, key: "", value: "" },
        ]);
      } else {
        const keyExists = selectedDetails.some(
          (detail) => detail.key === e.label
        );
        if (!keyExists) {
          setSelectedDetails([
            ...selectedDetails,
            { id: e.value, key: e.label, value: "" },
          ]);
        }
      }

      document.getElementById("inventoryField").value = "";
    }
  };

  let generalData = (
    <div className="grid grid-cols-12 w-full h-full gap-3 justify-center items-start">
      <div className="col-span-12">
        <p className=" text-gray-500">
          Llena los campos para agregar un nuevo inventario. Los campos marcados
          con <span className="text-red-500">*</span> son obligatorios.
        </p>
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label htmlFor="inventoryModelId" value="Modelo" />
        </div>
        <div className="relative">
          <AutocompleteInput
            data={inventoryModels}
            value={body.inventoryModelId}
            onChange={(e) => handleSelectInput(e, "inventoryModelId")}
            icon={Tb3DCubeSphere}
            isClearable
            isOtherOption
            required
          />
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6">
        {body.inventoryModelId == "0" && (
          <div>
            <div className="w-full flex gap-1">
              <span className="text-red-500">*</span>
              <Label htmlFor="otherModel" value="Especifique el Modelo" />
            </div>
            <TextInput
              id="otherModel"
              type="text"
              icon={Tb3DCubeSphere}
              color={"bg-white"}
              style={{
                borderColor: "#ccc",
                borderWidth: "1px",
                borderStyle: "solid",
                paddingTop: "13px",
                paddingBottom: "13px",
              }}
              placeholder="Especicar modelo"
              required={true}
              value={body.otherModel}
              onChange={(e) => setBody({ ...body, otherModel: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label
            htmlFor="inventoryBrandId"
            value="Selecciona la marca del equipo"
          />
        </div>
        <AutocompleteInput
          data={inventoryBrands}
          value={body.inventoryBrandId}
          onChange={(e) => handleSelectInput(e, "inventoryBrandId")}
          icon={MdNewReleases}
          isOtherOption
          isClearable
          disabled={
            body.otherModel == "" || body.inventoryModelId != "0" ? true : false
          }
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        {body.inventoryBrandId == "0" && (
          <div>
            <div className="w-full flex gap-1">
              <span className="text-red-500">*</span>
              <Label
                htmlFor="otherBrand"
                value="Especifique la Marca del equipo"
              />
            </div>
            <TextInput
              id="otherBrand"
              type="text"
              icon={MdNewReleases}
              color={"bg-white"}
              style={{
                borderColor: "#ccc",
                borderWidth: "1px",
                borderStyle: "solid",
                paddingTop: "13px",
                paddingBottom: "13px",
              }}
              placeholder="Especifique la marca"
              required={true}
              value={body.otherBrand}
              onChange={(e) => setBody({ ...body, otherBrand: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label
            htmlFor="inventoryTypeId"
            value="Selecciona el tipo de equipo"
          />
        </div>
        <AutocompleteInput
          data={inventoryTypes}
          value={body.inventoryTypeId}
          onChange={(e) => handleSelectInput(e, "inventoryTypeId")}
          icon={BiDevices}
          isOtherOption
          isClearable
          disabled={
            body.otherModel == "" || body.inventoryModelId != "0" ? true : false
          }
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        {body.inventoryTypeId == "0" && (
          <div>
            <div className="w-full flex gap-1">
              <span className="text-red-500">*</span>
              <Label
                htmlFor="otherType"
                value="Especifique el tipo de inventario"
              />
            </div>
            <TextInput
              id="otherType"
              type="text"
              icon={BiDevices}
              color={"bg-white"}
              style={{
                borderColor: "#ccc",
                borderWidth: "1px",
                borderStyle: "solid",
                paddingTop: "13px",
                paddingBottom: "13px",
              }}
              placeholder="Especifique el tipo de equipo"
              required={true}
              value={body.otherType}
              onChange={(e) => setBody({ ...body, otherType: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="mb-1 w-full flex gap-1">
          <span className="pr-2"></span>
          <Label htmlFor="serialNumber" value="Número de Serie" />
        </div>
        <TextInput
          id={"serialNumber"}
          type="text"
          icon={AiOutlineFieldNumber}
          placeholder="Número de serie"
          required={false}
          isClearable
          value={body.serialNumber}
          onChange={(e) => setBody({ ...body, serialNumber: e.target.value })}
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="mb-1 w-full flex gap-1">
          <span className="text-red-500 pr-2"></span>
          <Label htmlFor="activo" value="Número de activo" />
        </div>
        <TextInput
          id="activo"
          type="text"
          icon={AiOutlineNumber}
          placeholder="Activo"
          required={false}
          isClearable
          value={body.activo}
          onChange={(e) => setBody({ ...body, activo: e.target.value })}
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label htmlFor="status" value="¿Status del equipo?" />
        </div>
        <Select
          value={body.status}
          onChange={(e) => setBody({ ...body, status: e.target.value })}
          id="status"
          icon={MdOutlineCategory}
          color={"bg-white"}
          style={{
            borderColor: "#ccc",
            borderWidth: "1px",
            borderStyle: "solid",
            paddingTop: "13px",
            paddingBottom: "13px",
          }}
          required={true}
        >
          <option value="">-- Selecciona una opción --</option>
          <option value={1}>Alta</option>
          <option value={2}>Propuesta de baja</option>
          <option value={3}>Baja</option>
        </Select>
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="mb-1 w-full flex gap-1">
          <span className="text-red-500"></span>
          <Label htmlFor="recepcionDate" value="Fecha de recepción" />
        </div>
        <TextInput
          type="date"
          id="recepcionDate"
          name="recepcionDate"
          value={body.recepcionDate || ""}
          onChange={(e) => setBody({ ...body, recepcionDate: e.target.value })}
        />
      </div>
      <div className="col-span-12">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="comments"
            value="Comentarios"
          />
        </div>
        <ReactQuill
          id="comments"
          placeholder="Comentarios..."
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
            ],
          }}
          theme="snow"
          value={body.comments}
          onChange={(e) => setBody({ ...body, comments: e })}
        />
      </div>
      <div className="col-span-12 h-fit">
        <div className="mb-2 ">
          <Label value="Agregar imagenes" />
        </div>
        <CameraComponent capturedImage={images} setCapturedImage={setImages} />
      </div>
    </div>
  );

  let detailsData = (
    <div className="w-full h-full">
      <p className=" text-gray-500 pb-4">
        Selecciona los campos que deseas agregar al inventario.
      </p>
      <AutocompleteInput
        id={"inventoryField"}
        name={"inventoryField"}
        placeholder="Selecciona un campo"
        data={inventoryFields?.map((item) => ({
          value: item.id,
          label: item?.name ?? item?.key,
        }))}
        value={""}
        onChange={(e) => handleOtherField(e ?? null)}
        icon={TbListDetails}
        isClearable
        isOtherOption={selectedDetails.some((x) => x.id == "0") ? false : true}
      />
      <div className="w-full flex flex-col gap-2 py-4">
        <table className="w-full">
          <thead className="bg-neutral-300 text-sm md:text-base text-neutral-700">
            <tr className="border-b border-gray-200">
              <th className="text-left p-3">Campo</th>
              <th className="text-center p-3">Valor</th>
              <th className="text-center p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {selectedDetails.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="text-left text-xs md:text-base">
                  {item.id == "0" ? (
                    <TextInput
                      id={item.key}
                      type="text"
                      value={item.key}
                      onChange={(e) => {
                        let newSelectedDetails = [...selectedDetails];
                        newSelectedDetails[index].key = e.target.value;
                        setSelectedDetails(newSelectedDetails);
                      }}
                      isClearable
                    />
                  ) : (
                    <span className="uppercase font-medium p-3">
                      {item.key}
                    </span>
                  )}
                </td>
                <td className="text-center p-2">
                  <TextInput
                    id={item.key}
                    type="text"
                    placeholder={item.key}
                    value={item.value}
                    onChange={(e) => {
                      let newSelectedDetails = [...selectedDetails];
                      newSelectedDetails[index].value = e.target.value;
                      setSelectedDetails(newSelectedDetails);
                    }}
                    isClearable
                  />
                </td>
                <td className="text-center p-2 whitespace-nowrap">
                  {item.id == "0" && (
                    <button
                      type="button"
                      className="inline-flex justify-center items-center gap-2 text-blue-500 border bordere-blue-500 px-2 py-1 rounded-md text-sm md:text-base hover:border-blue-500 hover:bg-blue-500 hover:text-white transition ease-in-out duration-100"
                      onClick={() => {
                        let newInventoryFields = [...inventoryFields];
                        newInventoryFields.push({
                          id: selectedDetails.length + 1,
                          key: item.key,
                        });
                        setSelectedDetails([
                          ...selectedDetails.filter((x) => x.id != "0"),
                          {
                            id: selectedDetails.length,
                            key: item.key,
                            value: item.value,
                          },
                        ]);
                      }}
                      style={{ transition: "background-color 0.5s ease" }}
                    >
                      <span>
                        <MdAdd className="w-5 h-5 " />
                      </span>
                      <span className="hidden md:block">Agregar</span>
                    </button>
                  )}
                  {!Base_InventoryField.some(
                    (element) => element.key === item.key
                  ) && (
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center items-center gap-2 text-red-500 border bordere-red-500 px-2 py-1 rounded-md text-sm md:text-base hover:border-red-500 hover:bg-red-500 hover:text-white transition ease-in-out duration-100"
                      onClick={() => {
                        setSelectedDetails(
                          selectedDetails.filter((x) => x.id !== item.id)
                        );
                      }}
                      style={{ transition: "background-color 0.5s ease" }}
                    >
                      <span>
                        <MdClose className="w-5 h-5 " />
                      </span>
                      <span className="hidden md:block">Eliminar</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-white rounded-lg">
      <div className="grid grid-cols-2 w-full">
        <button
          type="button"
          className={`text-sm md:text-base font-bold ${
            showData == "general"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-neutral-500 border-b-2 border-neutral-300"
          } w-full flex justify-center items-center px-4 py-3`}
          onClick={() => setShowData("general")}
        >
          <span className="pr-2">
            <MdOutlineInventory className="w-5 h-5" />
          </span>
          {titleForm}
        </button>
        <button
          type="button"
          className={`text-sm md:text-base font-bold ${
            showData == "details"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-neutral-500 border-b-2 border-neutral-300"
          } w-full flex justify-center items-center px-4 py-3`}
          onClick={() => setShowData("details")}
        >
          <span className="pr-2">
            <TbListDetails className="w-5 h-5" />
          </span>
          Detalles
        </button>
      </div>
      <div className="w-full h-full p-3 md:p-5">
        {showData == "general" && generalData}
        {showData == "details" && detailsData}
      </div>
    </div>
  );
};

export default InventoryFields;

// {detailsFields.map((item, index) => (
//   <div className="flex items-center gap-2" key={index}>
//     <input
//       type="checkbox"
//       className="w-5 h-5 rounded-md border border-gray-300"
//       checked={selectedDetails?.some((x) => x.name == item.name)}
//       onChange={() => {
//         if (selectedDetails?.some((x) => x.name == item.name)) {
//           setSelectedDetails(
//             selectedDetails.filter((x) => x.id != item.id)
//           );
//         } else {
//           setSelectedDetails([...selectedDetails, item]);
//         }
//       }}
//     />
//     <p className="text-sm">{item.name}</p>
//   </div>
// ))}
