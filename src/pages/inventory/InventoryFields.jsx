import React, { useEffect, useState } from "react";
import { Checkbox, Label, TextInput, Select } from "flowbite-react";
import { MdNewReleases, MdOutlineCategory } from "react-icons/md";
import CameraComponent from "../../utils/CameraComponent";
import { BiDevices } from "react-icons/bi";
import { AiOutlineFieldNumber, AiOutlineNumber } from "react-icons/ai";
import { Tb3DCubeSphere } from "react-icons/tb";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputSelect from "react-select";

const InventoryFields = ({
  body = {
    inventoryTypeId: "",
    otherType: "",
    inventoryBrandId: "",
    otherBrand: "",
    inventoryModelId: "",
    otherModel: "",
    serialNumber: "",
    activo: "",
    comments: "",
    status: "",
    altaDate: null,
    bajaDate: nunll,
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
      <div className="col-span-12 md:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label htmlFor="inventoryModelId" value="Modelo" />
        </div>
        <div className="relative">
          <InputSelect
            placeholder="Modelo"
            options={inventoryModels}
            value={inventoryModels.find(
              (item) => item.id == body.inventoryModelId
            )}
            onChange={(e) => handleSelectInput(e, "inventoryModelId")}
            noOptionsMessage={() => "No hay coincidencias con tu busqueda"}
            formatOptionLabel={(option) => (
              <div className="flex items-center gap-2 text-neutral-500">
                <span>{option.label}</span>
              </div>
            )}
            classNames={{
              control: () => "p-1 pl-10",
              input: () => "text-md",
              option: () => "text-md",
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
          />
          <Tb3DCubeSphere
            size={20}
            className="absolute top-3 left-3 text-gray-500"
          />
        </div>
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
      <div className="col-span-12 md:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label
            htmlFor="inventoryBrandId"
            value="Selecciona la marca del equipo"
          />
        </div>
        <div className="relative">
          <InputSelect
            placeholder="Marca"
            options={inventoryBrands}
            value={inventoryBrands.find(
              (item) => item.id == body.inventoryBrandId
            )}
            onChange={(e) => handleSelectInput(e, "inventoryBrandId")}
            noOptionsMessage={() => "No hay coincidencias con tu busqueda"}
            formatOptionLabel={(option) => (
              <div className="flex items-center gap-2 text-neutral-500">
                <span>{option.label}</span>
              </div>
            )}
            classNames={{
              control: () => "p-1 pl-10",
              input: () => "text-md",
              option: () => "text-md",
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
            isDisabled={
              body.otherModel == "" || body.inventoryModelId != "0"
                ? true
                : false
            }
          />
          <MdNewReleases
            size={19}
            className="absolute top-3 left-3 text-gray-500"
          />
        </div>
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
      <div className="col-span-12 md:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label
            htmlFor="inventoryTypeId"
            value="Selecciona el tipo de equipo"
          />
        </div>
        <div className="relative">
          <InputSelect
            placeholder="Tipo de equipo"
            options={inventoryTypes}
            value={inventoryTypes.find(
              (item) => item.id == body.inventoryTypeId
            )}
            onChange={(e) => handleSelectInput(e, "inventoryTypeId")}
            noOptionsMessage={() => "No hay coincidencias con tu busqueda"}
            formatOptionLabel={(option) => (
              <div className="flex items-center gap-2 text-neutral-500">
                <span>{option.label}</span>
              </div>
            )}
            classNames={{
              control: () => "p-1 pl-10",
              input: () => "text-md",
              option: () => "text-md",
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
            isDisabled={
              body.otherModel == "" || body.inventoryModelId != "0"
                ? true
                : false
            }
          />
          <BiDevices
            size={19}
            className="absolute top-3 left-3 text-gray-500"
          />
        </div>
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
      <div className="col-span-12 md:col-span-6">
        <div className="mb-1 w-full flex gap-1">
          <span className="pr-2"></span>
          <Label htmlFor="serialNumber" value="Número de Serie" />
        </div>
        <TextInput
          id="serialNumber"
          type="text"
          icon={AiOutlineFieldNumber}
          color={"bg-white"}
          style={{
            borderColor: "#ccc",
            borderWidth: "1px",
            borderStyle: "solid",
            paddingTop: "13px",
            paddingBottom: "13px",
          }}
          placeholder="Número de serie"
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
          color={"bg-white"}
          style={{
            borderColor: "#ccc",
            borderWidth: "1px",
            borderStyle: "solid",
            paddingTop: "13px",
            paddingBottom: "13px",
          }}
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
          <option value={true}>Alta</option>
          <option value={false}>Baja</option>
        </Select>
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
