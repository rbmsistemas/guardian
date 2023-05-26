import {
  Button,
  Label,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { BrandType, InventaryType } from "../../utils/Types";
import CameraComponent from "../../utils/CameraComponent";

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
    <div className="grid grid-cols-12 w-full h-full gap-2 justify-center items-start p-2 md:p-5 bg-white rounded-lg">
      <div className="col-span-12">
        <h2 className="text-xl font-bold text-gap-primary">Nuevo inventario</h2>
        <p className=" text-gray-500">
          Llena los campos para agregar un nuevo inventario. Los campos marcados
          con <span className="text-red-500">*</span> son obligatorios.
        </p>
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="mb-2 w-full">
          <Label
            htmlFor="inventaryType"
            value="Selecciona el tipo de inventario"
          />
        </div>
        <Select
          id="inventaryType"
          icon={MdOutlineCategory}
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
            <div className="mb-2 w-full">
              <Label htmlFor="otherBrand" value="Especifique el tipo" />
            </div>
            <TextInput
              id="otherBrand"
              type="text"
              icon={MdOutlineCategory}
              placeholder="Marca"
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
        <div className="mb-2 w-full">
          <Label htmlFor="brandType" value="Selecciona la marca" />
        </div>
        <Select
          id="brandType"
          icon={MdOutlineCategory}
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
            <div className="mb-2 w-full">
              <Label htmlFor="otherBrand" value="Marca" />
            </div>
            <TextInput
              id="otherBrand"
              type="text"
              icon={MdOutlineCategory}
              placeholder="Marca"
              required={true}
              value={body.otherBrand}
              onChange={(e) => setBody({ ...body, otherBrand: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="mb-2 w-full">
          <Label htmlFor="model" value="Modelo" />
        </div>
        <TextInput
          id="model"
          type="text"
          icon={MdOutlineCategory}
          placeholder="Modelo"
          required={true}
          value={body.model}
          onChange={(e) => setBody({ ...body, model: e.target.value })}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="mb-2 w-full">
          <Label htmlFor="SN" value="Número de Serie" />
        </div>
        <TextInput
          id="SN"
          type="text"
          icon={MdOutlineCategory}
          placeholder="SN"
          required={true}
          value={body.sn}
          onChange={(e) => setBody({ ...body, sn: e.target.value })}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="mb-2 w-full">
          <Label htmlFor="activo" value="# Activo" />
        </div>
        <TextInput
          id="activo"
          type="text"
          icon={MdOutlineCategory}
          placeholder="# Activo"
          required={true}
          value={body.activo}
          onChange={(e) => setBody({ ...body, activo: e.target.value })}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="mb-2 w-full">
          <Label htmlFor="status" value="Selecciona el Status" />
        </div>
        <Select id="status" icon={MdOutlineCategory} required={true}>
          <option value="">-- Selecciona una opción --</option>
          <option value="1">Alta</option>
          <option value="2">Baja</option>
        </Select>
      </div>
      <div className="col-span-12" id="textarea">
        <div className="mb-2 ">
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
        <CameraComponent capturedImage={images} setCapturedImage={setImages} />
      </div>
    </div>
  );
};

export default CreateInventario;
