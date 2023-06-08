import React, { useState } from "react";
import { Label, Select, TextInput } from "flowbite-react";
import { AiOutlinePoweroff } from "react-icons/ai";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaStore,
} from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";

const CrearProveedores = ({
  proveedor = {
    proveedor: "",
    encargado: "",
    email: "",
    phone: "",
    address: "",
    logo: "",
    status: true,
    comments: "",
  },
  setProveedor,
  image,
  setImage,
}) => {
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-5 pb-2">
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="proveedor"
            value="Nombre del Proveedor"
          />
        </div>
        <TextInput
          id="proveedor"
          type="text"
          icon={FaStore}
          placeholder="Proveedor"
          required={true}
          value={proveedor.proveedor}
          onChange={(e) =>
            setProveedor({ ...proveedor, proveedor: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="encargado"
            value="Nombre del Encargado"
          />
        </div>
        <TextInput
          id="encargado"
          type="text"
          icon={FaUser}
          placeholder="Encargado"
          required={true}
          value={proveedor.encargado}
          onChange={(e) =>
            setProveedor({ ...proveedor, encargado: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="email"
            value="Correo Electrónico"
          />
        </div>
        <TextInput
          id="email"
          type="email"
          icon={FaEnvelope}
          placeholder="Correo Electrónico"
          required={true}
          value={proveedor.email}
          onChange={(e) =>
            setProveedor({ ...proveedor, email: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label className="font-semibold" htmlFor="phone" value="Teléfono" />
        </div>
        <TextInput
          id="phone"
          type="text"
          icon={FaPhone}
          placeholder="Teléfono"
          required={true}
          value={proveedor.phone}
          onChange={(e) =>
            setProveedor({ ...proveedor, phone: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="address"
            value="Dirección"
          />
        </div>
        <TextInput
          id="address"
          type="text"
          icon={FaMapMarkerAlt}
          placeholder="Dirección"
          value={proveedor.address}
          onChange={(e) =>
            setProveedor({ ...proveedor, address: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label className="font-semibold" htmlFor="status" value="Estado" />
        </div>
        <Select
          icon={AiOutlinePoweroff}
          required={true}
          id="status"
          value={proveedor.status}
          onChange={(e) =>
            setProveedor({ ...proveedor, status: e.target.value })
          }
        >
          <option value={true}>Activo</option>
          <option value={false}>Inactivo</option>
        </Select>
      </div>
      <div className="col-span-2 md:col-span-2 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="comments"
            value="Comentarios"
          />
        </div>
        <textarea
          id="comments"
          type="text"
          placeholder="Comentarios"
          value={proveedor.comments}
          onChange={(e) =>
            setProveedor({ ...proveedor, comments: e.target.value })
          }
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gap-primary focus:border-transparent"
          rows="5"
        />
      </div>

      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label className="font-semibold" htmlFor="logo" value="Logo" />
        </div>
        {image || proveedor.logo ? (
          <img
            src={
              proveedor.logo.length > 0
                ? proveedor.logo
                : URL.createObjectURL(image)
            }
            className="w-full h-auto"
            alt="logo"
          />
        ) : null}
        <input
          type="file"
          id="logo"
          name="logo"
          accept="image/*"
          onChange={handleLogoChange}
        />
      </div>
      <div className="flex justify-end col-span-2 p-4">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
        >
          <span>
            <MdSaveAlt className="text-white text-lg" />
          </span>
          Guardar Proveedor
        </button>
      </div>
    </div>
  );
};

export default CrearProveedores;
