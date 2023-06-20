import React, { useEffect, useState } from "react";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CrearActividad = ({
  actividad = {
    titulo: "",
    supervisor: "",
    fechas: [],
    trabajadores: {},
    herramientas: {},
    ubicaciones: "",
    horario_inicial: "",
    horario_final: "",
    observaciones: "",
    isVehicle: false,
    isVisita: false,
    vehiclePhotos: [],
    driverPhotos: [],
    status: false,
  },
  setActividad,
  photosDriver,
  setPhotosDriver,
  photosVehicle,
  setPhotosVehicle,
}) => {
  const handleLogoChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (type === "vehicle") {
        setPhotosVehicle([...photosVehicle, file]);
      }
      if (type === "driver") {
        setPhotosDriver([...photosDriver, file]);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-5 pb-2">
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="titulo"
            value="Nombre de la actividad"
          />
        </div>
        <TextInput
          id="titulo"
          type="text"
          icon={FaStore}
          placeholder="Titulo de la actividad"
          required={true}
          value={actividad.titulo}
          onChange={(e) =>
            setActividad({ ...actividad, titulo: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="supervisor"
            value="Nombre del Supervisor"
          />
        </div>
        <TextInput
          id="supervisor"
          type="text"
          icon={FaUser}
          placeholder="Supervisor"
          required={true}
          value={actividad.supervisor}
          onChange={(e) =>
            setActividad({ ...actividad, supervisor: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="fechas"
            value="Fechas de servicio"
          />
        </div>
        <TextInput
          id="fechas"
          type="date"
          multiple={true}
          icon={FaEnvelope}
          placeholder="Fecha"
          required={true}
          value={actividad.fechas}
          onChange={(e) =>
            setActividad({ ...actividad, fechas: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="horario_inicial"
            value="Horario inicial"
          />
        </div>
        <TextInput
          id="horario_inicial"
          type="time"
          icon={FaEnvelope}
          placeholder="Horario inicial"
          required={true}
          value={actividad.horario_inicial}
          onChange={(e) =>
            setActividad({ ...actividad, horario_inicial: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="horario_final"
            value="Horario final"
          />
        </div>
        <TextInput
          id="horario_final"
          type="time"
          icon={FaEnvelope}
          placeholder="Horario final"
          required={true}
          value={actividad.horario_final}
          onChange={(e) =>
            setActividad({ ...actividad, horario_final: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full flex items-center gap-2">
          <input
            type="checkbox"
            id="isVisita"
            name="isVisita"
            checked={actividad.isVisita}
            onChange={(e) =>
              setActividad({ ...actividad, isVisita: e.target.checked })
            }
          />
          <label htmlFor="isVisita">¿Es visita?</label>
        </div>
      </div>
      <div className="col-span-2 md:col-span-2 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="trabajadores"
            value="Trabajadores y TIAs"
          />
        </div>
        <ReactQuill
          className="mb-10"
          theme="snow"
          value={actividad.trabajadores}
          onChange={(e) =>
            setActividad({ ...actividad, trabajadores: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-2 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="herramientas"
            value="Herramientas"
          />
        </div>
        <ReactQuill
          className="mb-10"
          theme="snow"
          value={actividad.herramientas}
          onChange={(e) =>
            setActividad({ ...actividad, herramientas: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-2 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="ubicaciones"
            value="Ubicaciones"
          />
        </div>
        <ReactQuill
          className="mb-10"
          theme="snow"
          value={actividad.ubicaciones}
          onChange={(e) =>
            setActividad({ ...actividad, ubicaciones: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-2 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="observaciones"
            value="Observaciones"
          />
        </div>
        <ReactQuill
          className="mb-10"
          theme="snow"
          value={actividad.observaciones}
          onChange={(e) =>
            setActividad({ ...actividad, observaciones: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full flex items-center gap-2">
          <input
            type="checkbox"
            id="isVehicle"
            name="isVehicle"
            checked={actividad.isVehicle}
            onChange={(e) =>
              setActividad({ ...actividad, isVehicle: e.target.checked })
            }
          />
          <label htmlFor="isVisita">¿Es visita?</label>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label className="font-semibold" htmlFor="chofer" value="Chofer" />
        </div>
        <TextInput
          id="chofer"
          type="text"
          icon={FaUser}
          placeholder="Chofer"
          required={true}
          value={actividad?.chofer || ""}
          onChange={(e) =>
            setActividad({ ...actividad, chofer: e.target.value })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="placas"
            value="Placas del vehiculo"
          />
        </div>
        <TextInput
          id="placas"
          type="text"
          icon={FaMapMarkerAlt}
          placeholder="Placas del vehiculo"
          value={actividad?.placas || ""}
          onChange={(e) =>
            setActividad({ ...actividad, placas: e.target.value })
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
          value={actividad.status || false}
          onChange={(e) =>
            setActividad({ ...actividad, status: e.target.value })
          }
        >
          <option value={false}>Borrador</option>
          <option value={true}>Enviar para autorización</option>
        </Select>
      </div>
      {/* <div className="col-span-2 md:col-span-1 flex flex-col gap-2 pt-20 md:pt-10">
        <div className="w-full">
          <Label className="font-semibold" htmlFor="logo" value="Logo" />
        </div>
        {image || actividad.logo ? (
          <img
            src={!image ? actividad.logo : URL.createObjectURL(image)}
            className="w-full max-w-sm h-auto rounded-lg"
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
      </div> */}
      <div className="flex justify-end col-span-2 p-4">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
        >
          <span>
            <MdSaveAlt className="text-white text-lg" />
          </span>
          Guardar actividad
        </button>
      </div>
    </div>
  );
};

export default CrearActividad;
