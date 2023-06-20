import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaHome } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import CrearActividad from "./CrearActividad";
import Loading from "../../utils/Loading";
import { toast } from "react-hot-toast";
import Context from "../../context/Context";
import { uploadImagesActivities } from "../../api/request.api";

const ActividadForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    createActivity,
    user,
    updateActivity,
    activity,
    getActivity,
    clearActivity,
  } = useContext(Context);
  const [actividad, setActividad] = useState({
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
    placas: "",
    chofer: "",
    status: false,
  });
  const [voler, setVoler] = useState(false);

  const [photosVehicle, setPhotosVehicle] = useState([]);
  const [photosDriver, setPhotosDriver] = useState([]);
  const [observaciones, setObservaciones] = useState(actividad.observaciones);
  const [loading, setLoading] = useState(false);
  const notificationError = (message) => toast.error(message);
  const successNotification = (message) => toast.success(message);

  useEffect(() => {
    if (id) {
      getActivity(id);
    } else {
      clearActivity();
    }
  }, [id]);

  useEffect(() => {
    if (activity) {
      setActividad({
        titulo: actividad.titulo || "",
        supervisor: actividad.supervisor || "",
        fechas: actividad.fechas || [],
        trabajadores: actividad.trabajadores || {},
        herramientas: actividad.herramientas || {},
        ubicaciones: actividad.ubicaciones || "",
        horario_inicial: actividad.horario_inicial || "",
        horario_final: actividad.horario_final || "",
        observaciones: observaciones || "",
        isVehicle: actividad.isVehicle || false,
        isVisita: actividad.isVisita || false,
        vehiclePhotos: actividad.vehiclePhotos || [],
        driverPhotos: actividad.driverPhotos || [],
        placas: actividad.placas || "",
        chofer: actividad.chofer || "",
        status: actividad.status || false,
      });
      setObservaciones(actividad.observaciones);
    }
  }, [activity]);

  useEffect(() => {
    if (id) {
      if (
        actividad.titulo !== activity.titulo ||
        actividad.supervisor !== activity.supervisor ||
        actividad.fechas !== activity.fechas ||
        actividad.trabajadores !== activity.trabajadores ||
        actividad.herramientas !== activity.herramientas ||
        actividad.ubicaciones !== activity.ubicaciones ||
        actividad.horario_inicial !== activity.horario_inicial ||
        actividad.horario_final !== activity.horario_final ||
        actividad.observaciones !== activity.observaciones ||
        actividad.isVehicle !== activity.isVehicle ||
        actividad.isVisita !== activity.isVisita ||
        actividad.vehiclePhotos !== activity.vehiclePhotos ||
        actividad.driverPhotos !== activity.driverPhotos ||
        actividad.placas !== activity.placas ||
        actividad.chofer !== activity.chofer ||
        actividad.status !== activity.status
      ) {
        setVoler(true);
      } else {
        setVoler(false);
      }
    }
  }, [actividad]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (id) {
      try {
        let newDriverLicence = [];
        if (photosVehicle.length > 0) {
          newDriverLicence = await handleUploadFile();
        }
        let newVehicle = [];
        if (photosVehicle.length > 0) {
          newVehicle = await handleUploadFile();
        }

        const newActivity = {
          ...actividad,
          observaciones,
          vehiclePhotos: newVehicle ?? actividad.vehiclePhotos,
          driverPhotos: newDriverLicence ?? actividad.driverPhotos,
        };

        const res = await updateActivity(id, newActivity, user.token);
        if (res?.status > 299) {
          notificationError("Error al actualizar la actividad");
          return console.log(res);
        }
        successNotification("Actividad actualizada correctamente");
        setTimeout(() => {
          navigate(`/actividades/editar/${id}`);
        }, 2000);
        setLoading(false);
      } catch (error) {
        console.log(error);
        notificationError("Error al actualizar la imagen");
      }
    } else {
      let newDriverLicence = [];
      if (photosVehicle.length > 0) {
        newDriverLicence = await handleUploadFile();
        setActividad({
          ...actividad,
          driverPhotos: [...actividad.driverPhotos, ...newDriverLicence],
        });
      }
      let newVehicle = [];
      if (photosVehicle.length > 0) {
        newVehicle = await handleUploadFile();
        setActividad({
          ...actividad,
          vehiclePhotos: [...actividad.vehiclePhotos, ...newVehicle],
        });
      }
      const newActivity = {
        ...actividad,
        observaciones,
        vehiclePhotos: newVehicle,
        driverPhotos: newDriverLicence,
      };

      console.log(newActivity);
      const res = await createActivity(newActivity);

      if (res?.status > 299) {
        notificationError("Error al crear la actividad");
        return console.log(res.data.message);
      }
      successNotification("Actividad creada correctamente");
      setTimeout(() => {
        navigate(`/actividad/editar/${res.id}`);
      }, 2000);
      setLoading(false);
    }
  };

  const handleUploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const imageRes = await uploadImagesActivities(formData, user.token);
      if (imageRes?.status > 299) {
        setLoading(false);
        notificationError("Error al actualizar la imagen");
        console.log(imageRes);
      }
      return imageRes.data;
    } catch (error) {
      console.log(error);
      notificationError("Error al actualizar la imagen");
    }
  };

  return (
    <div className="min-h-full h-auto w-full p-5">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <FaHome className="text-xl" />
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="/actividades" className="text-gray-500 hover:text-gray-700">
            Actividades
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="#" className="text-gray-500 hover:text-gray-700">
            Nueva actividad
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            to="/actividades"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <IoArrowBack className="text-white text-lg" />
            </span>
            {voler ? "Cancelar" : "Volver"}
          </Link>
          {id && (
            <Link
              to={`/actividades/ver/${id}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
            >
              <span>
                <FaEye className="text-white text-lg" />
              </span>
              Ver actividad
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold"></h2>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 mt-5 bg-white p-5 rounded-lg"
        >
          <CrearActividad
            actividad={actividad}
            setActividad={setActividad}
            observaciones={observaciones}
            setObservaciones={setObservaciones}
            photosVehicle={photosVehicle}
            setPhotosVehicle={setPhotosVehicle}
            photosDriver={photosDriver}
            setPhotosDriver={setPhotosDriver}
          />
        </form>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default ActividadForm;
