import React, { useEffect } from "react";
import { Label, Select } from "flowbite-react";
import { MdNewReleases, MdOutlineCategory } from "react-icons/md";
import CameraComponent from "../../utils/CameraComponent";
import { BiDevices } from "react-icons/bi";
import { AiOutlineFieldNumber, AiOutlineNumber } from "react-icons/ai";
import { Tb3DCubeSphere } from "react-icons/tb";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AutocompleteInput from "../../components/inputs/AutocompleteInput";
import TextInput from "../../components/inputs/TextInput";

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
  titleForm,
  handleSelectInput,
}) => {
  useEffect(() => {
    if (body.inventoryTypeId != "0") setBody({ ...body, otherType: "" });
    if (body.inventoryBrandId != "0") setBody({ ...body, otherBrand: "" });
    if (body.inventoryModelId != "0") setBody({ ...body, otherModel: "" });
  }, [body.inventoryTypeId, body.inventoryBrandId, body.inventoryModelId]);

  return (
    <div className="grid grid-cols-12 w-full h-full gap-3 justify-center items-start p-5 bg-white rounded-lg">
      <div className="col-span-12">
        <h2 className="text-xl font-bold text-blue-600">{titleForm}</h2>
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
};

export default InventoryFields;
