import React, { useEffect, useState } from "react";
import { Label, Select, Table, TextInput } from "flowbite-react";
import { AiOutlineCamera, AiOutlinePoweroff } from "react-icons/ai";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaStore,
  FaClock,
  FaCalendar,
  FaCar,
  FaRegTrashAlt,
} from "react-icons/fa";
import {
  MdEditSquare,
  MdGavel,
  MdPersonAdd,
  MdRemove,
  MdRemoveCircleOutline,
  MdSaveAlt,
} from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import InputDateRange from "../../components/DateRange/InputDateRange";

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
  photosDriver = {
    driver_front: "",
    driver_back: "",
  },
  setPhotosDriver,
  photosVehicle = {
    placas_front: "",
    placas_back: "",
  },
  setPhotosVehicle,
  tools,
  setTools,
}) => {
  const [newWorker, setNewWorker] = useState({
    name: "",
    tia: "",
    isVisita: false,
  });
  const [newTool, setNewTool] = useState({ name: "", quantity: "" });

  const notificationError = (message) => toast.error(message);
  const successNotification = (message) => toast.success(message);

  const handleImagesChange = (e, file, type) => {
    e.preventDefault();
    if (file) {
      switch (type) {
        case "driver_front":
          setPhotosDriver({ ...photosDriver, driver_front: file });
          break;
        case "driver_back":
          setPhotosDriver({ ...photosDriver, driver_back: file });
          break;
        case "placas_front":
          setPhotosVehicle({ ...photosVehicle, placas_front: file });
          break;
        case "placas_back":
          setPhotosVehicle({ ...photosVehicle, placas_back: file });
          break;
        default:
          break;
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
      setNewWorker({ name: "", tia: "", isVisita: false });
    }
  };

  const handleDeleteWorker = (e, tia) => {
    e.preventDefault();
    setWorkers(workers.filter((worker) => worker.tia !== tia));
  };

  const handleEdithWorker = (e, tia) => {
    e.preventDefault();
    const worker = workers.find((worker) => worker.tia === tia);
    setNewWorker(worker);
    setWorkers(workers.filter((worker) => worker.tia !== tia));
  };

  const handleNewTool = (e) => {
    e.preventDefault();
    if (!newTool.name || !newTool.quantity)
      return notificationError("Todos los campos son obligatorios.");

    if (tools.find((tool) => tool.name === newTool.name)) {
      return notificationError(
        "El nombre de la herramienta o la cantidad ya existe en esta lista."
      );
    }
    if (newTool.name && newTool.quantity) {
      setTools([...tools, newTool]);
      setNewTool({ name: "", quantity: "" });
    }
  };

  const handleDeleteTool = (e, name) => {
    e.preventDefault();
    setTools(tools.filter((tool) => tool.name !== name));
  };

  const handleEdithTool = (e, name) => {
    e.preventDefault();
    const tool = tools.find((tool) => tool.name === name);
    setNewTool(tool);
    setTools(tools.filter((tool) => tool.name !== name));
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
          icon={MdGavel}
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
            value="Nombre del Supervisor o Encargado"
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
      <InputDateRange
        startDate={actividad.fechas[0]}
        endDate={actividad.fechas[1]}
        setStartDate={(date) =>
          setActividad({ ...actividad, fechas: [date, actividad.fechas[1]] })
        }
        setEndDate={(date) =>
          setActividad({ ...actividad, fechas: [actividad.fechas[0], date] })
        }
      />
      <div className="col-span-2 md:col-span-1 flex flex-col md:flex-row gap-2">
        <div className="w-full flex flex-col gap-2">
          <Label
            className="font-semibold"
            htmlFor="horario_inicial"
            value="Hora de inicio"
          />
          <TextInput
            id="horario_inicial"
            type="time"
            icon={FaClock}
            required={true}
            value={actividad.horario_inicial}
            onChange={(e) =>
              setActividad({ ...actividad, horario_inicial: e.target.value })
            }
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label
            className="font-semibold"
            htmlFor="horario_final"
            value="Hora de finalización aproximada"
          />
          <TextInput
            id="horario_final"
            type="time"
            icon={FaClock}
            required={true}
            value={actividad.horario_final}
            onChange={(e) =>
              setActividad({ ...actividad, horario_final: e.target.value })
            }
          />
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="isVisita"
            value="Tipo de acceso"
          />
        </div>
        <div className="w-full flex items-center p-2 gap-2 border border-gray-300 rounded-md bg-gray-50">
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
          <label htmlFor="isVisita">¿Requiere TIA de visitante?</label>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="isVehicle"
            value="Vehículos"
          />
        </div>
        <div className="w-full flex items-center p-2 gap-2 border border-gray-300 rounded-md bg-gray-50">
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
          <label htmlFor="isVehicle">¿Requiere Vehículo?</label>
        </div>
      </div>

      <div className="bg-gray-200 dark:bg-gray-700 col-span-2 pb-1 rounded-md"></div>
      <div className="col-span-2 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="trabajadores"
            value="Registro de trabajadores que requieren acceso"
          />
        </div>
        <Table
          striped
          hoverable
          className="w-full rounded-lg whitespace-nowrap border border-collapse border-gray-200 dark:border-gray-700"
        >
          <Table.Head className="uppercase">
            <Table.HeadCell>Trabajador</Table.HeadCell>
            <Table.HeadCell>Numero de TIA</Table.HeadCell>
            {actividad.isVisita && (
              <Table.HeadCell className="text-center">
                ¿Es Visita?
              </Table.HeadCell>
            )}
            <Table.HeadCell>Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {workers.map((worker, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 font-semibold"
              >
                <Table.Cell>{worker?.name ?? " - "}</Table.Cell>
                <Table.Cell>{worker?.tia ?? " - "}</Table.Cell>
                {actividad.isVisita && (
                  <Table.Cell className="text-center">
                    <input
                      type="checkbox"
                      name="workerVisita"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={worker.isVisita}
                      onChange={(e) => {
                        const newWorkers = [...workers];
                        newWorkers[index].isVisita = e.target.checked;
                        setWorkers(newWorkers);
                      }}
                    />
                  </Table.Cell>
                )}
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
                  className="w-full bg-gray-50 py-2 border-b border-gray-300 border-t-0 border-r-0 border-l-0 text-sm"
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
                  className="w-full bg-gray-50 py-2 border-b border-gray-300 border-t-0 border-r-0 border-l-0 text-sm"
                  required={true}
                  value={newWorker.tia}
                  onChange={(e) =>
                    setNewWorker({ ...newWorker, tia: e.target.value })
                  }
                />
              </Table.Cell>
              {actividad.isVisita && (
                <Table.Cell className="text-center">
                  <input
                    type="checkbox"
                    name="workerVisita"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={newWorker.isVisita}
                    onChange={(e) =>
                      setNewWorker({ ...newWorker, isVisita: e.target.checked })
                    }
                  />
                </Table.Cell>
              )}
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
      <div className="bg-gray-200 dark:bg-gray-700 col-span-2 pb-1 rounded-md"></div>
      <div className="col-span-2 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="trabajadores"
            value="Registro de Herramienta"
          />
        </div>
        <Table
          striped
          hoverable
          className="w-full rounded-lg whitespace-nowrap border border-collapse border-gray-200 dark:border-gray-700"
        >
          <Table.Head className="uppercase">
            <Table.HeadCell>Herramienta</Table.HeadCell>
            <Table.HeadCell>Cantidad</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {tools.map((tool, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 font-semibold"
              >
                <Table.Cell>{tool.name}</Table.Cell>
                <Table.Cell>{tool.quantity}</Table.Cell>
                <Table.Cell className="flex gap-3">
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center Table.Rowansition ease-in-out duration-200 hover:scale-105"
                    onClick={(e) => {
                      handleDeleteTool(e, tool.name);
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
                      handleEdithTool(e, tool.name);
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
                  className="w-full bg-gray-50 p-2 border-b border-gray-300 border-t-0 border-r-0 border-l-0 text-sm"
                  required={true}
                  value={newTool.name}
                  onChange={(e) =>
                    setNewTool({ ...newTool, name: e.target.value })
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <input
                  id="addtool"
                  type="text"
                  placeholder="Cantidad de herramienta"
                  className="w-full bg-gray-50 p-2 border-b border-gray-300 border-t-0 border-r-0 border-l-0 text-sm"
                  required={true}
                  value={newTool.quantity}
                  onChange={(e) =>
                    setNewTool({ ...newTool, quantity: e.target.value })
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <button
                  type="button"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center Table.Rowansition ease-in-out duration-200 hover:scale-105"
                  onClick={handleNewTool}
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
      {actividad.isVehicle && (
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-4 w-full">
            <div className="col-span-2 flex flex-col gap-2">
              <div className="w-full">
                <Label
                  className="font-semibold"
                  htmlFor="chofer"
                  value="Nombre completo del chofer"
                />
              </div>
              <TextInput
                id="chofer"
                type="text"
                icon={FaUser}
                placeholder="Nombre completo del chofer del vehículo"
                required={true}
                value={actividad?.chofer || ""}
                onChange={(e) =>
                  setActividad({ ...actividad, chofer: e.target.value })
                }
              />
            </div>
            <div className="min-w-full w-48 h-48">
              {photosDriver?.driver_front ? (
                <div className="w-full border-2 border-dashed border-gray-400 rounded-lg relative">
                  <span
                    onClick={() =>
                      setPhotosDriver({ ...photosDriver, driver_front: "" })
                    }
                    className="absolute top-3 right-3 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white text-xl cursor-pointer p-2 transition ease-in-out hover:scale-110 duration-150"
                  >
                    <FaRegTrashAlt />
                  </span>
                  <img
                    className="rounded-lg cursor-pointer h-48 w-full object-center object-cover p-1"
                    onClick={() => selectImage(photosDriver.driver_front)}
                    src={photosDriver.driver_front}
                    alt="image-captured"
                  />
                </div>
              ) : (
                <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg transition ease-in-out duration-200 hover:scale-105 hover:bg-gray-100">
                  <label
                    htmlFor="upload"
                    className="w-full h-full flex flex-col justify-center items-center gap-2 cursor-pointer"
                  >
                    <span className="text-3xl text-gray-500">
                      <AiOutlineCamera />
                    </span>
                    <span className="text-gray-500 font-semibold text-center">
                      Identificación (Frontal)
                    </span>
                  </label>
                  <input
                    type="file"
                    id="upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        handleImagesChange(e, reader.result, "driver_front");
                      };
                    }}
                  />
                </div>
              )}
            </div>
            <div className="min-w-full w-48 h-48">
              {photosDriver?.driver_back ? (
                <div className="w-full border-2 border-dashed border-gray-400 rounded-lg relative">
                  <span
                    onClick={() =>
                      setPhotosDriver({ ...photosDriver, driver_back: "" })
                    }
                    className="absolute top-3 right-3 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white text-xl cursor-pointer p-2 transition ease-in-out hover:scale-110 duration-150"
                  >
                    <FaRegTrashAlt />
                  </span>
                  <img
                    className="rounded-lg cursor-pointer h-48 w-full object-center object-cover p-1"
                    onClick={() => selectImage(photosDriver.driver_back)}
                    src={photosDriver.driver_back}
                    alt="image-captured"
                  />
                </div>
              ) : (
                <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg transition ease-in-out duration-200 hover:scale-105 hover:bg-gray-100">
                  <label
                    htmlFor="upload"
                    className="w-full h-full flex flex-col justify-center items-center gap-2 cursor-pointer"
                  >
                    <span className="text-3xl text-gray-500">
                      <AiOutlineCamera />
                    </span>
                    <span className="text-gray-500 font-semibold text-center">
                      Identificación (Posterior)
                    </span>
                  </label>
                  <input
                    type="file"
                    id="upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        handleImagesChange(e, reader.result, "driver_back");
                      };
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-4 w-full">
            <div className="col-span-2 flex flex-col gap-2">
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
                icon={FaCar}
                placeholder="Placas del Vehículo"
                value={actividad?.placas || ""}
                onChange={(e) =>
                  setActividad({ ...actividad, placas: e.target.value })
                }
              />
            </div>
            <div className="min-w-full w-48 h-48">
              {photosVehicle?.placas_front ? (
                <div className="w-full border-2 border-dashed border-gray-400 rounded-lg relative">
                  <span
                    onClick={() =>
                      setPhotosVehicle({ ...photosVehicle, placas_front: "" })
                    }
                    className="absolute top-3 right-3 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white text-xl cursor-pointer p-2 transition ease-in-out hover:scale-110 duration-150"
                  >
                    <FaRegTrashAlt />
                  </span>
                  <img
                    className="rounded-lg cursor-pointer h-48 w-full object-center object-cover p-1"
                    onClick={() => selectImage(photosVehicle.placas_front)}
                    src={photosVehicle.placas_front}
                    alt="image-captured"
                  />
                </div>
              ) : (
                <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg transition ease-in-out duration-200 hover:scale-105 hover:bg-gray-100">
                  <label
                    htmlFor="upload"
                    className="w-full h-full flex flex-col justify-center items-center gap-2 cursor-pointer"
                  >
                    <span className="text-3xl text-gray-500">
                      <AiOutlineCamera />
                    </span>
                    <span className="text-gray-500 font-semibold text-center">
                      Identificación (Frontal)
                    </span>
                  </label>
                  <input
                    type="file"
                    id="upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        handleImagesChange(e, reader.result, "placas_front");
                      };
                    }}
                  />
                </div>
              )}
            </div>
            <div className="min-w-full w-48 h-48">
              {photosVehicle?.placas_back ? (
                <div className="w-full border-2 border-dashed border-gray-400 rounded-lg relative">
                  <span
                    onClick={() =>
                      setPhotosVehicle({ ...photosVehicle, placas_back: "" })
                    }
                    className="absolute top-3 right-3 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white text-xl cursor-pointer p-2 transition ease-in-out hover:scale-110 duration-150"
                  >
                    <FaRegTrashAlt />
                  </span>
                  <img
                    className="rounded-lg cursor-pointer h-48 w-full object-center object-cover p-1"
                    onClick={() => selectImage(photosDriver.placas_back)}
                    src={photosVehicle.placas_back}
                    alt="image-captured"
                  />
                </div>
              ) : (
                <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg transition ease-in-out duration-200 hover:scale-105 hover:bg-gray-100">
                  <label
                    htmlFor="upload"
                    className="w-full h-full flex flex-col justify-center items-center gap-2 cursor-pointer"
                  >
                    <span className="text-3xl text-gray-500">
                      <AiOutlineCamera />
                    </span>
                    <span className="text-gray-500 font-semibold text-center">
                      Identificación (Posterior)
                    </span>
                  </label>
                  <input
                    type="file"
                    id="upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        handleImagesChange(e, reader.result, "placas_back");
                      };
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="status"
            value="Estado de la actividad"
          />
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
          <option
            className="bg-white text-gray-800 font-semibold py-2"
            value={false}
          >
            Guardar Borrador
          </option>
          <option
            className="bg-white text-gray-800 font-semibold py-2"
            value={true}
          >
            Enviar para autorización
          </option>
        </Select>
      </div>
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
