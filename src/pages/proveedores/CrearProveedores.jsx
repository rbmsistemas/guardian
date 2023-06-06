import { Label, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaStore,
} from "react-icons/fa";

const CrearProveedores = () => {
  const [data, setData] = useState({
    proveedor: "",
    encargado: "",
    email: "",
    phone: "",
    address: "",
    comments: "",
    status: true,
  });
  return (
    <div className="grid grid-cols-2 gap-2 md:gap-5 pb-2">
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label htmlFor="proveedor" value="Nombre del Proveedor" />
        </div>
        <TextInput
          id="proveedor"
          type="text"
          icon={FaStore}
          placeholder="Proveedor"
          required={true}
          value={data.proveedor}
          onChange={(e) => setData({ ...data, proveedor: e.target.value })}
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label htmlFor="encargado" value="Nombre del Encargado" />
        </div>
        <TextInput
          id="encargado"
          type="text"
          icon={FaUser}
          placeholder="Encargado"
          required={true}
          value={data.encargado}
          onChange={(e) => setData({ ...data, encargado: e.target.value })}
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label htmlFor="email" value="Correo Electrónico" />
        </div>
        <TextInput
          id="email"
          type="email"
          icon={FaEnvelope}
          placeholder="Correo Electrónico"
          required={true}
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label htmlFor="phone" value="Teléfono" />
        </div>
        <TextInput
          id="phone"
          type="text"
          icon={FaPhone}
          placeholder="Teléfono"
          required={true}
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label htmlFor="address" value="Dirección" />
        </div>
        <TextInput
          id="address"
          type="text"
          icon={FaMapMarkerAlt}
          placeholder="Dirección"
          required={true}
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label htmlFor="status" value="Estado" />
        </div>
        <Select
          icon={AiOutlinePoweroff}
          id="status"
          value={data.status}
          onChange={(e) => setData({ ...data, status: e.target.value })}
        >
          <option value={true}>Activo</option>
          <option value={false}>Inactivo</option>
        </Select>
      </div>
      <div className="col-span-2 md:col-span-2 flex flex-col gap-2">
        <div className="w-full">
          <Label htmlFor="comments" value="Comentarios" />
        </div>
        <textarea
          id="comments"
          type="text"
          placeholder="Comentarios"
          required={true}
          value={data.comments}
          onChange={(e) => setData({ ...data, comments: e.target.value })}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gap-primary focus:border-transparent"
          rows="5"
        />
      </div>
    </div>
  );
};

export default CrearProveedores;
