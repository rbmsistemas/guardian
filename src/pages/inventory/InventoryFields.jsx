import React, { useEffect, useState } from "react";
import { Checkbox, Label, TextInput, Select } from "flowbite-react";
import { MdNewReleases, MdOutlineCategory } from "react-icons/md";
import CameraComponent from "../../utils/CameraComponent";
import { BiDevices } from "react-icons/bi";
import { AiOutlineFieldNumber, AiOutlineNumber } from "react-icons/ai";
import { Tb3DCubeSphere } from "react-icons/tb";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaUserCheck } from "react-icons/fa";
import InputSelect from "react-select";

const InventoryFields = ({
  body = {
    inventoryTypeId: "",
    otherInventory: "",
    inventoryBrandId: "",
    otherBrand: "",
    inventoryModelId: "",
    otherModel: "",
    serialNumber: "",
    activo: "",
    comments: "",
    status: "",
    isAsigned: false,
    altaDate: null,
    bajaDate: nunll,
    asignacionDate: null,
  },
  setBody,
  images = [],
  setImages,
  inventoryTypes = [],
  inventoryBrands = [],
  inventoryModels = [],
  titleForm,
}) => {
  useEffect(() => {
    if (body.inventoryTypeId !== "otro")
      setBody({ ...body, otherInventory: "" });
    if (body.inventoryBrandId !== "otro") setBody({ ...body, otherBrand: "" });
    if (body.inventoryModelId !== "otro") setBody({ ...body, otherModel: "" });
  }, [body.inventoryTypeId, body.inventoryBrandId, body.inventoryModelId]);

  const onSelectInventoryModel = (e) => {
    console.log(e);
    setBody({ ...body, inventoryModelId: e.value });
  };

  return (
    <div className="grid grid-cols-12 w-full h-full gap-3 justify-center items-start p-5 bg-white rounded-lg">
      <div className="col-span-12">
        <h2 className="text-xl font-bold text-blue-600">{titleForm}</h2>
        <p className=" text-gray-500">
          Llena los campos para agregar un nuevo inventario. Los campos marcados
          con <span className="text-red-500">*</span> son obligatorios.
        </p>
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label htmlFor="inventoryModelId" value="Modelo" />
        </div>
        <InputSelect
          id="inventoryModelId"
          placeholder="Modelo"
          isClearable
          classNames={{
            control: () => "p-1 border-2",
            input: () => "text-lg",
            option: () => "text-lg",
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "black",
              primary25: "#FFC62C",
            },
          })}
          value={body.inventoryModelId}
          onChange={onSelectInventoryModel}
          options={[
            ...inventoryModels.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            }),
            { value: "0", label: "Otro" },
          ]}
          formatOptionLabel={(option) => (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">
                <Tb3DCubeSphere />
              </span>
              <span>{option.label}</span>
            </div>
          )}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
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
              placeholder="Especicar modelo"
              required={true}
              value={body.otherModel}
              onChange={(e) => setBody({ ...body, otherModel: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label
            htmlFor="inventoryBrandId"
            value="Selecciona la marca del equipo"
          />
        </div>
        <Select
          id="inventoryBrandId"
          icon={MdNewReleases}
          required={true}
          value={body.inventoryBrandId}
          onChange={(e) =>
            setBody({ ...body, inventoryBrandId: e.target.value })
          }
        >
          <option value="">-- Selecciona una opción --</option>
          {inventoryBrands.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
          <option value="0">Otro</option>
        </Select>
      </div>
      <div className="col-span-12 md:col-span-6">
        {body.inventoryBrandId == "0" && (
          <div>
            <div className="w-full flex gap-1">
              <span className="text-red-500">*</span>
              <Label htmlFor="otherBrand" value="Marca del equipo" />
            </div>
            <TextInput
              id="otherBrand"
              type="text"
              icon={MdNewReleases}
              placeholder="Especifique la marca"
              required={true}
              value={body.otherBrand}
              onChange={(e) => setBody({ ...body, otherBrand: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label
            htmlFor="inventoryTypeId"
            value="Selecciona el tipo de equipo"
          />
        </div>
        <Select
          id="inventoryTypeId"
          icon={BiDevices}
          required={true}
          value={body.inventoryTypeId}
          onChange={(e) =>
            setBody({ ...body, inventoryTypeId: e.target.value })
          }
        >
          <option value="">-- Selecciona una opción --</option>
          {inventoryTypes.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
          <option value="0">Otro</option>
        </Select>
      </div>
      <div className="col-span-12 md:col-span-6">
        {body.inventoryTypeId == "0" && (
          <div>
            <div className="w-full flex gap-1">
              <span className="text-red-500">*</span>
              <Label htmlFor="otherType" value="Otro tipo" />
            </div>
            <TextInput
              id="otherType"
              type="text"
              icon={BiDevices}
              placeholder="Especifique el tipo de equipo"
              required={true}
              value={body.otherType}
              onChange={(e) => setBody({ ...body, otherType: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="mb-1 w-full flex gap-1">
          <span className="pr-2"></span>
          <Label htmlFor="serialNumber" value="Número de Serie" />
        </div>
        <TextInput
          id="serialNumber"
          type="text"
          icon={AiOutlineFieldNumber}
          placeholder="serialNumber"
          required={false}
          value={body.serialNumber}
          onChange={(e) => setBody({ ...body, serialNumber: e.target.value })}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
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
          value={body.activo}
          onChange={(e) => setBody({ ...body, activo: e.target.value })}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label htmlFor="status" value="Selecciona el tipo de inventario" />
        </div>
        <Select
          value={body.status}
          onChange={(e) => setBody({ ...body, status: e.target.value })}
          id="status"
          icon={MdOutlineCategory}
          required={true}
        >
          <option value="">-- Selecciona una opción --</option>
          <option value={true}>Alta</option>
          <option value={false}>Baja</option>
        </Select>
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500"></span>
          <Label htmlFor="isAsigned" value="¿El equipo ha sido asignado?" />
        </div>
        <div className="flex bg-gray-50 gap-4 items-center justify-start w-full p-3 py-2 rounded-md mt-1 border border-gray-300">
          <FaUserCheck className="text-2xl text-gray-500" />
          <Checkbox
            checked={body.isAsigned}
            onChange={(e) => setBody({ ...body, isAsigned: e.target.checked })}
          />
          <span className="text-gray-500">{body.isAsigned ? "Sí" : "No"}</span>
        </div>
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
