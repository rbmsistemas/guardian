import React, { useContext, useEffect, useState } from "react";
// import GuardianLogo from "../../assets/img/guardian_alt.png";
import GuardianLogo from "../../assets/logo/sinabe_icon.png";
import { Link } from "react-router-dom";
import Bodega from "../../assets/img/bodega.webp";
import Users from "../../assets/img/users.webp";
import Reports from "../../assets/img/reportes.jpg";
import Proveedores from "../../assets/img/proveedores_01.jpg";
import Context from "../../context/Context";
import { BsDatabaseFillAdd, BsDatabaseFillDash } from "react-icons/bs";
import {
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import { BounceLoader } from "react-spinners";

const Home = () => {
  const { inventories, getInventories } = useContext(Context);
  const [countInventories, setCountInventories] = useState({
    alta: 0,
    baja: 0,
    asignados: 0,
    sinAsignar: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const handleGetInventories = async () => {
      await getInventories();
    };
    handleGetInventories();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    setCountInventories({
      alta: inventories?.filter((inventary) => inventary.status === true)
        .length,
      baja: inventories?.filter((inventary) => inventary.status === false)
        .length,
      // asignados: inventories.filter((inventary) => inventary.isAsigned === true)
      //   .length,
      // sinAsignar: inventories.filter(
      //   (inventary) => inventary.isAsigned === false
      // ).length,
    });
  }, [inventories]);

  return (
    <div className="flex flex-col min-h-full h-full p-2 md:p-4 gap-4">
      <h1 className="text-xl text-left font-bold text-purple-600">
        Bienvenido
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 4xl:grid-cols-5 gap-4 bg-white p-2 md:p-4 rounded-lg">
        <p className="col-span-2 md:col-span-4 4xl:col-span-5 text-base text-left font-bold text-purple-600">
          Resumen de inventario
        </p>
        <Link
          to={"/inventario"}
          className="relative h-32 bg-gradient-to-br from-amber-400 to-orange-700 rounded-lg shadow-lg flex flex-col justify-center items-center"
        >
          <div className="absolute right-1 top-1">
            <BsDatabaseFillAdd className="text-6xl text-white opacity-50" />
          </div>
          <p className="text-6xl text-white font-bold">
            {!loading ? (
              countInventories.alta
            ) : (
              <BounceLoader color={"#ffffff"} loading={loading} />
            )}
          </p>
          <h3 className="text-sm text-center lg:text-base text-white font-bold">
            Equipos en alta
          </h3>
        </Link>
        <Link
          to={"/inventario"}
          className="relative h-32 bg-gradient-to-br from-purple-400 to-sky-700 rounded-lg shadow-xl flex flex-col justify-center items-center"
        >
          <div className="absolute right-1 top-1">
            <BsDatabaseFillDash className="text-6xl text-white opacity-50" />
          </div>
          <p className="text-6xl text-white font-bold">
            {!loading ? (
              countInventories.baja
            ) : (
              <BounceLoader color={"#ffffff"} loading={loading} />
            )}
          </p>
          <h3 className="text-sm text-center lg:text-base text-white font-bold">
            Equipos en baja
          </h3>
        </Link>
        {/* <Link
          to={"/inventario"}
          className="relative h-32 bg-gradient-to-br from-green-400 to-teal-700 rounded-lg shadow-xl flex flex-col justify-center items-center"
        >
          <div className="absolute right-1 top-1">
            <AiOutlineUsergroupAdd className="text-6xl text-white opacity-50" />
          </div>
          <p className="text-6xl text-white font-bold">
            {!loading ? (
              countInventories.asignados
            ) : (
              <BounceLoader color={"#ffffff"} loading={loading} />
            )}
          </p>
          <h3 className="text-sm text-center lg:text-base text-white font-bold">
            Equipos asignados
          </h3>
        </Link>
        <Link
          to={"/inventario"}
          className="relative h-32 bg-gradient-to-br from-blue-400 to-sky-700 rounded-lg shadow-xl flex flex-col justify-center items-center"
        >
          <div className="absolute right-1 top-1">
            <AiOutlineUsergroupDelete className="text-6xl text-white opacity-50" />
          </div>
          <p className="text-6xl text-white font-bold">
            {!loading ? (
              countInventories.sinAsignar
            ) : (
              <BounceLoader color={"#ffffff"} loading={loading} />
            )}
          </p>
          <h3 className="text-sm text-center lg:text-base text-white font-bold">
            Equipos sin asignar
          </h3>
        </Link> */}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 4xl:grid-cols-5 gap-4 bg-white p-2 md:p-4 rounded-lg">
        <p className="col-span-2 md:col-span-4 4xl:col-span-5 text-base text-left font-bold text-purple-600">
          Accesos directos
        </p>
        <Link
          to={"/inventario"}
          className="bg-white min-h-[24vh] rounded-lg shadow-lg relative flex flex-col justify-center items-center gap-3 hover:scale-105 hover:shadow-xl transition ease-in-out duration-200"
        >
          <img
            src={Bodega}
            className="w-full min-h-full h-auto rounded-lg"
            alt="Inventario"
          />
          <h2 className="text-sm sm:text-lg xl:text-xl text-white text-right p-3 font-bold absolute bottom-0 right-0 bg-purple-700/60 w-full rounded-b-lg">
            Control de Inventario
          </h2>
        </Link>
        <Link
          to={"/inventario"}
          className="bg-white min-h-[24vh] rounded-lg shadow-lg relative flex flex-col justify-center items-center gap-3 hover:scale-105 hover:shadow-xl transition ease-in-out duration-200"
        >
          <img
            src={Reports}
            className="w-full min-h-full h-auto rounded-lg"
            alt="Inventario"
          />
          <h2 className="text-sm sm:text-lg xl:text-xl text-white text-right p-3 font-bold absolute bottom-0 right-0 bg-purple-700/60 w-full rounded-b-lg">
            Generar Reportes
          </h2>
        </Link>
        <Link
          to={"/users"}
          className="bg-white min-h-[24vh] rounded-lg shadow-lg relative flex flex-col justify-center items-center gap-3 hover:scale-105 hover:shadow-xl transition ease-in-out duration-200"
        >
          <img
            src={Users}
            className="w-full min-h-full h-auto rounded-lg"
            alt="Inventario"
          />
          <h2 className="text-sm sm:text-lg xl:text-xl text-white text-right p-3 font-bold absolute bottom-0 right-0 bg-purple-700/60 w-full rounded-b-lg">
            Gestión de usuarios
          </h2>
        </Link>
        <Link
          to={"/proveedores"}
          className="bg-white min-h-[24vh] rounded-lg shadow-lg relative flex flex-col justify-center items-center gap-3 hover:scale-105 hover:shadow-xl transition ease-in-out duration-200"
        >
          <img
            src={Proveedores}
            className="w-full min-h-full h-auto rounded-lg"
            alt="Proveedores imagen"
          />
          <h2 className="text-sm sm:text-lg xl:text-xl text-white text-right p-3 font-bold absolute bottom-0 right-0 bg-purple-700/60 w-full rounded-b-lg">
            Control de Proveedores
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Home;
