import React, { useEffect } from "react";
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

const CreateInventory = ({
  body = {
    inventaryTypeId: "",
    otherInventary: "",
    inventaryBrandId: "",
    otherBrand: "",
    inventaryModelId: "",
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
  inventaryTypes = [],
  inventaryBrands = [],
  inventaryModels = [],
  titleForm,
}) => {
  useEffect(() => {
    if (body.inventaryTypeId !== "otro")
      setBody({ ...body, otherInventary: "" });
    if (body.inventaryBrandId !== "otro") setBody({ ...body, otherBrand: "" });
    if (body.inventaryModelId !== "otro") setBody({ ...body, otherModel: "" });
  }, [body.inventaryTypeId, body.inventaryBrandId, body.inventaryModelId]);

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
          <Label
            htmlFor="inventaryTypeId"
            value="Selecciona el tipo de equipo"
          />
        </div>
        <Select
          id="inventaryTypeId"
          icon={BiDevices}
          required={true}
          value={body.inventaryTypeId}
          onChange={(e) =>
            setBody({ ...body, inventaryTypeId: e.target.value })
          }
        >
          <option value="">-- Selecciona una opción --</option>
          {inventaryTypes.map((item) => {
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
        {body.inventaryTypeId == "0" && (
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
              value={body.otherInventary}
              onChange={(e) =>
                setBody({ ...body, otherInventary: e.target.value })
              }
            />
          </div>
        )}
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label
            htmlFor="inventaryBrandId"
            value="Selecciona la marca del equipo"
          />
        </div>
        <Select
          id="inventaryBrandId"
          icon={MdNewReleases}
          required={true}
          value={body.inventaryBrandId}
          onChange={(e) =>
            setBody({ ...body, inventaryBrandId: e.target.value })
          }
        >
          <option value="">-- Selecciona una opción --</option>
          {inventaryBrands.map((item) => {
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
        {body.inventaryBrandId == "0" && (
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
          <Label htmlFor="inventaryModelId" value="Modelo" />
        </div>
        <InputSelect
          placeholder="Modelo"
          isClearable
          value={body.inventaryModelId}
          onChange={(e) =>
            setBody({ ...body, inventaryModelId: e ? e.value : "" })
          }
          options={inventaryModels.map((item) => {
            return {
              value: item.id,
              label: item.name,
            };
          })}
          formatOptionLabel={(option) => (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">
                <Tb3DCubeSphere />
              </span>
              <span>{option.label}</span>
            </div>
          )}
        />
        {/* <Select
          id="inventaryModelId"
          icon={Tb3DCubeSphere}
          required={true}
          value={body.inventaryModelId}
          onChange={(e) =>
            setBody({ ...body, inventaryModelId: e.target.value })
          }
        >
          <option value="">-- Selecciona una opción --</option>
          {inventaryModels.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
          <option value="0">Otro</option>
        </Select> */}
      </div>
      <div className="col-span-12 md:col-span-6">
        {body.inventaryModelId == "0" && (
          <div>
            <div className="w-full flex gap-1">
              <span className="text-red-500">*</span>
              <Label htmlFor="inventaryModelId" value="Especifique el Modelo" />
            </div>
            <TextInput
              id="inventaryModelId"
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

export default CreateInventory;
