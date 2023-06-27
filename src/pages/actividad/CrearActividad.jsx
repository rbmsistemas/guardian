import React, { useEffect, useState } from "react";
import { Label, Select, Table, TextInput } from "flowbite-react";
import { AiOutlinePoweroff } from "react-icons/ai";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaStore,
} from "react-icons/fa";
import {
  MdEditSquare,
  MdPersonAdd,
  MdRemove,
  MdRemoveCircleOutline,
  MdSaveAlt,
} from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";

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
  workers = [],
  setWorkers,
  photosDriver,
  setPhotosDriver,
  photosVehicle,
  setPhotosVehicle,
}) => {
  const [newWorker, setNewWorker] = useState({ name: "", tia: "" });
  const [editWorker, setEditWorker] = useState({ name: "", tia: "" });

  const notificationError = (message) => toast.error(message);
  const successNotification = (message) => toast.success(message);

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

  const handleNewWorker = (e) => {
    e.preventDefault();
    if (!newWorker.name || !newWorker.tia)
      return notificationError("Todos los campos son obligatorios.");

    if (
      workers.find(
        (worker) =>
          worker.tia === newWorker.tia || worker.name === newWorker.name
      )
    ) {
      return notificationError(
        "El número de TIA o trabajador ya existe en esta lista."
      );
    }

    if (newWorker.name && newWorker.tia) {
      setWorkers([...workers, newWorker]);
      setNewWorker({ name: "", tia: "" });
    }
  };

  const handleDeleteWorker = (e, tia) => {
    e.preventDefault();
    setWorkers(workers.filter((worker) => worker.tia !== tia));
  };

  const handleEdithWorker = (e, tia) => {
    e.preventDefault();
    const worker = workers.find((worker) => worker.tia === tia);
    setEditWorker(worker);
    setWorkers(workers.filter((worker) => worker.tia !== tia));
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
            value="Fechas en que se realizara el servicio"
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
      <div className="col-span-2 md:col-span-1 flex flex-col md:flex-row gap-2">
        <div className="w-full flex flex-col gap-2">
          <div>
            <Label
              className="font-semibold"
              htmlFor="horario_inicial"
              value="Hora de inicio"
            />
          </div>
          <TextInput
            id="horario_inicial"
            type="time"
            icon={FaEnvelope}
            required={true}
            value={actividad.horario_inicial}
            onChange={(e) =>
              setActividad({ ...actividad, horario_inicial: e.target.value })
            }
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div>
            <Label
              className="font-semibold"
              htmlFor="horario_final"
              value="Hora de finalización aproximada"
            />
          </div>
          <TextInput
            id="horario_final"
            type="time"
            icon={FaEnvelope}
            required={true}
            value={actividad.horario_final}
            onChange={(e) =>
              setActividad({ ...actividad, horario_final: e.target.value })
            }
          />
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full flex items-center gap-2">
          <input
            type="checkbox"
            id="isVisita"
            name="isVisita"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={actividad.isVisita}
            onChange={(e) =>
              setActividad({ ...actividad, isVisita: e.target.checked })
            }
          />
          <label htmlFor="isVisita">¿Es visita?</label>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full flex items-center gap-2">
          <input
            type="checkbox"
            id="isVehicle"
            name="isVehicle"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={actividad.isVehicle}
            onChange={(e) =>
              setActividad({ ...actividad, isVehicle: e.target.checked })
            }
          />
          <label htmlFor="isVisita">¿Requiere Vehículo?</label>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <Table hoverable className="w-full rounded-lg whitespace-nowrap">
          <Table.Head className="uppercase">
            <Table.HeadCell>Trabajador</Table.HeadCell>
            <Table.HeadCell>Numero de TIA</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {workers.map((worker, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{worker.name}</Table.Cell>
                <Table.Cell>{worker.tia}</Table.Cell>
                <Table.Cell className="flex gap-3">
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center Table.Rowansition ease-in-out duration-200 hover:scale-105"
                    onClick={(e) => {
                      handleDeleteWorker(e, worker.tia);
                    }}
                  >
                    <span>
                      <MdRemoveCircleOutline className="text-white text-lg" />
                    </span>
                    Eliminar
                  </button>
                  <button
                    type="button"
                    className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center Table.Rowansition ease-in-out duration-200 hover:scale-105"
                    onClick={(e) => {
                      handleEdithWorker(e, worker.tia);
                    }}
                  >
                    <span>
                      <MdEditSquare className="text-white text-lg" />
                    </span>
                    Editar
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
            <Table.Row>
              <Table.Cell>
                <input
                  id="name"
                  type="text"
                  placeholder="Nombre del trabajador"
                  className="w-full bg-gray-50 p-2 border-b border-gray-300 border-t-0 border-r-0 border-l-0"
                  required={true}
                  value={newWorker.name}
                  onChange={(e) =>
                    setNewWorker({ ...newWorker, name: e.target.value })
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <input
                  id="tia"
                  type="text"
                  placeholder="Número de TIA"
                  className="w-full bg-gray-50 p-2 border-b border-gray-300 border-t-0 border-r-0 border-l-0"
                  required={true}
                  value={newWorker.tia}
                  onChange={(e) =>
                    setNewWorker({ ...newWorker, tia: e.target.value })
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <button
                  type="button"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center Table.Rowansition ease-in-out duration-200 hover:scale-105"
                  onClick={handleNewWorker}
                >
                  <span>
                    <MdPersonAdd className="text-white text-lg" />
                  </span>
                  Agregar
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
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
