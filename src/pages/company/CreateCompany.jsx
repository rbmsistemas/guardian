import React, { useEffect, useState } from "react";
import { Label, Select, TextInput } from "flowbite-react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FaEnvelope, FaPhone, FaUser, FaStore } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormatedUrlImage } from "../../utils/FormatedUrlImage";

const CreateCompany = ({
  company = {
    name: "",
    manager: "",
    email: "",
    phone: "",
    logo: "",
    status: true,
    comments: "",
  },
  onChange = () => {},
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:gap-5 pb-2">
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="name"
            value="Nombre de la compañia"
          />
        </div>
        <TextInput
          id="name"
          name="name"
          type="text"
          icon={FaStore}
          placeholder="Compañia"
          required={true}
          value={company.name}
          onChange={onChange}
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="manager"
            value="Nombre del Encargado"
          />
        </div>
        <TextInput
          id="manager"
          name="manager"
          type="text"
          icon={FaUser}
          placeholder="Encargado"
          required={true}
          value={company.manager}
          onChange={onChange}
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
          name="email"
          type="email"
          icon={FaEnvelope}
          placeholder="Correo Electrónico"
          required={true}
          value={company.email}
          onChange={onChange}
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label className="font-semibold" htmlFor="phone" value="Teléfono" />
        </div>
        <TextInput
          id="phone"
          name="phone"
          type="text"
          icon={FaPhone}
          placeholder="Teléfono"
          required={true}
          value={company.phone}
          onChange={onChange}
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label className="font-semibold" htmlFor="status" value="Estado" />
        </div>
        <Select
          id="status"
          name="status"
          icon={AiOutlinePoweroff}
          required={true}
          value={company.status}
          onChange={onChange}
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
        <ReactQuill
          id="comments"
          name="comments"
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
          value={company.comments}
          onChange={(value) =>
            onChange({ target: { name: "comments", value } })
          }
        />
      </div>

      <div className="col-span-2 md:col-span-1 flex flex-col gap-2 pt-20 md:pt-10">
        <div className="w-full">
          <Label className="font-semibold" htmlFor="logo" value="Logo" />
        </div>
        {company.logo ? (
          <img
            src={FormatedUrlImage(company.logo)}
            className="w-full max-w-sm h-auto rounded-lg"
            alt="logo"
          />
        ) : null}
        <input
          type="file"
          id="logo"
          name="logo"
          accept="image/*"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CreateCompany;
