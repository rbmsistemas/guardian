import React from "react";
import GuardianLogo from "../../assets/img/guardian_alt_icon.png";
import { Link } from "react-router-dom";
import Bodega from "../../assets/img/bodega.webp";
import Users from "../../assets/img/users.webp";
import Reports from "../../assets/img/reportes.jpg";

const Home = () => {
  return (
    <div className="flex flex-col min-h-full h-full p-3 gap-4">
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex justify-center items-center gap-3">
          <img
            src={GuardianLogo}
            className="h-20 md:h-24 w-auto"
            alt="Guardian Logo"
          />
        </div>
        <h1 className="text-xl font-bold text-sky-800">
          Bienvenido a Guardian
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Link
          to={"/inventario"}
          className="bg-white rounded-lg shadow-lg relative flex flex-col justify-center items-center gap-3 hover:scale-105 hover:shadow-xl transition ease-in-out duration-200"
        >
          <img
            src={Bodega}
            className="w-full h-auto rounded-lg"
            alt="Inventario"
          />
          <h2 className="text-2xl text-gap-orange text-right p-4 font-bold absolute bottom-0 right-0 bg-black/60 w-full">
            Control de Inventario
          </h2>
        </Link>
        <Link
          to={"/inventario"}
          className="bg-white rounded-lg shadow-lg relative flex flex-col justify-center items-center gap-3 hover:scale-105 hover:shadow-xl transition ease-in-out duration-200"
        >
          <img
            src={Reports}
            className="w-full h-auto rounded-lg"
            alt="Inventario"
          />
          <h2 className="text-2xl text-gap-orange text-right p-4 font-bold absolute bottom-0 right-0 bg-black/60 w-full">
            Generar Reportes
          </h2>
        </Link>
        <Link
          to={"/inventario"}
          className="bg-white rounded-lg shadow-lg relative flex flex-col justify-center items-center gap-3 hover:scale-105 hover:shadow-xl transition ease-in-out duration-200"
        >
          <img
            src={Users}
            className="w-full h-auto rounded-lg"
            alt="Inventario"
          />
          <h2 className="text-2xl text-gap-orange text-right p-4 font-bold absolute bottom-0 right-0 bg-black/60 w-full">
            Gestión de usuarios
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Home;
