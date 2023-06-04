import React from "react";
import GuardianLogo from "../../assets/img/guardian_alt_icon.png";
import { Link } from "react-router-dom";
import Inventary from "../../assets/img/inventario.jpg";
import Users from "../../assets/img/usuarios.jpg";
import Reports from "../../assets/img/reportes.jpg";

const Home = () => {
  return (
    <div className="flex flex-col min-h-full h-full p-3 gap-4">
      <div className="flex justify-center items-center gap-3">
        <img
          src={GuardianLogo}
          className="h-20 md:h-24 w-auto"
          alt="Guardian Logo"
        />
      </div>
      <div className="flex justify-start gap-3">
        <h1 className="text-xl font-bold">Bienvenido a Guardian</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Link
          to={"/inventario"}
          className="bg-white rounded-lg shadow-lg p-5 flex flex-col justify-center items-center gap-3 hover:scale-105 hover:shadow-xl transition ease-in-out duration-200"
        >
          <img src={Inventary} className="h-44 w-auto" alt="Inventario" />
          <h2 className="text-xl font-bold">Control de Inventario</h2>
        </Link>
        <Link
          to={"/inventario"}
          className="bg-white rounded-lg shadow-lg p-5 flex flex-col justify-center items-center gap-3 hover:scale-105 hover:shadow-xl transition ease-in-out duration-200"
        >
          <img src={Reports} className="h-44 w-auto" alt="Inventario" />
          <h2 className="text-xl font-bold">Reportes</h2>
        </Link>
        <Link
          to={"/inventario"}
          className="bg-white rounded-lg shadow-lg p-5 flex flex-col justify-center items-center gap-3 hover:scale-105 transition ease-in-out duration-200"
        >
          <img src={Users} className="h-44 w-auto" alt="Inventario" />
          <h2 className="text-xl font-bold">Gestión de usuarios</h2>
        </Link>
      </div>
    </div>
  );
};

export default Home;
