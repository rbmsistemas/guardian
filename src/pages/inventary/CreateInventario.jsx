import { Label, Select, TextInput, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { BrandType, InventaryType } from "../../utils/Types";
import CameraComponent from "../../utils/CameraComponent";
import { BiDevices, BiRegistered } from "react-icons/bi";
import { AiOutlineFieldNumber, AiOutlineNumber } from "react-icons/ai";
import { Tb3DCubeSphere } from "react-icons/tb";

const CreateInventario = () => {
  const [body, setBody] = useState({
    inventaryType: "",
    otherInventary: "",
    brandType: "",
    otherBrand: "",
    model: "",
    sn: "",
    activo: "",
    comment: "",
    status: "",
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (body.inventaryType !== "otro") setBody({ ...body, otherInventary: "" });
    if (body.brandType !== "otro") setBody({ ...body, otherBrand: "" });
  }, [body.inventaryType, body.brandType]);

  return (
    <div className="grid grid-cols-12 w-full h-full gap-3 justify-center items-start p-5 bg-white rounded-lg">
      <div className="col-span-12">
        <h2 className="text-xl font-bold text-gap-primary">Nuevo inventario</h2>
        <p className=" text-gray-500">
          Llena los campos para agregar un nuevo inventario. Los campos marcados
          con <span className="text-red-500">*</span> son obligatorios.
        </p>
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label htmlFor="inventaryType" value="Selecciona el tipo de equipo" />
        </div>
        <Select
          id="inventaryType"
          icon={BiDevices}
          required={true}
          value={body.inventaryType}
          onChange={(e) => setBody({ ...body, inventaryType: e.target.value })}
        >
          <option value="">-- Selecciona una opción --</option>
          {InventaryType.map((item) => {
            return (
              <option key={item.clave} value={item.name}>
                {item.name}
              </option>
            );
          })}
          <option value="otro">Otro</option>
        </Select>
      </div>
      <div className="col-span-12 md:col-span-6">
        {body.inventaryType == "otro" && (
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
          <Label htmlFor="brandType" value="Selecciona la marca del equipo" />
        </div>
        <Select
          id="brandType"
          icon={BiRegistered}
          required={true}
          value={body.brandType}
          onChange={(e) => setBody({ ...body, brandType: e.target.value })}
        >
          <option value="">-- Selecciona una opción --</option>
          {BrandType.map((item) => {
            return (
              <option key={item.clave} value={item.clave}>
                {item.name}
              </option>
            );
          })}
          <option value="otro">Otro</option>
        </Select>
      </div>
      <div className="col-span-12 md:col-span-6">
        {body.brandType == "otro" && (
          <div>
            <div className="w-full flex gap-1">
              <span className="text-red-500">*</span>
              <Label htmlFor="otherBrand" value="Marca del equipo" />
            </div>
            <TextInput
              id="otherBrand"
              type="text"
              icon={BiRegistered}
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
          <Label htmlFor="model" value="Modelo" />
        </div>
        <TextInput
          id="model"
          type="text"
          icon={Tb3DCubeSphere}
          placeholder="Modelo"
          required={true}
          value={body.model}
          onChange={(e) => setBody({ ...body, model: e.target.value })}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label htmlFor="SN" value="Número de Serie" />
        </div>
        <TextInput
          id="SN"
          type="text"
          icon={AiOutlineFieldNumber}
          placeholder="SN"
          required={true}
          value={body.sn}
          onChange={(e) => setBody({ ...body, sn: e.target.value })}
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
          required={true}
          value={body.activo}
          onChange={(e) => setBody({ ...body, activo: e.target.value })}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label htmlFor="status" value="Selecciona el estado del equipo" />
        </div>
        <Select id="status" icon={MdOutlineCategory} required={true}>
          <option value="">-- Selecciona una opción --</option>
          <option value="1">Alta</option>
          <option value="0">Baja</option>
        </Select>
      </div>
      <div className="col-span-12" id="textarea">
        <div className="mb-1 w-full flex gap-1">
          <span className="text-red-500 pr-2"> </span>
          <Label htmlFor="comment" value="Comentarios" />
        </div>
        <Textarea
          id="comment"
          placeholder="Comentarios..."
          required={true}
          rows={4}
        />
      </div>
      <div className="col-span-12">
        <div className="mb-2 ">
          <Label value="Agregar imagenes" />
        </div>
        <CameraComponent capturedImage={images} setCapturedImage={setImages} />
      </div>
    </div>
  );
};

export default CreateInventario;
