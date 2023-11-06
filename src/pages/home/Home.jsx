import React, { useContext, useEffect, useState } from "react";
// import GuardianLogo from "../../assets/img/guardian_alt.png";
import GuardianLogo from "../../assets/logo/sinabe_icon.png";
import { Link } from "react-router-dom";
import Bodega from "../../assets/img/bodega.webp";
import Users from "../../assets/img/users.webp";
import Reports from "../../assets/img/reportes.jpg";
import Companies from "../../assets/img/proveedores_01.jpg";
import Context from "../../context/Context";
import {
  BsDatabaseFill,
  BsDatabaseFillAdd,
  BsDatabaseFillDash,
} from "react-icons/bs";
import {
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import { BounceLoader } from "react-spinners";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  RadialLinearScale
);

const Home = () => {
  const { inventories, getInventories, users, getUsers } = useContext(Context);
  const [countInventories, setCountInventories] = useState({
    alta: 0,
    propuestaBaja: 0,
    baja: 0,
  });
  const [loading, setLoading] = useState(false);
  const [usersInventories, setUsersInventories] = useState({
    labels: [],
    data: [],
  });
  const [time, setTime] = useState(7);

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
      alta: inventories?.filter((inventary) => inventary.status == 1).length,
      propuestaBaja: inventories?.filter((inventary) => inventary.status == 2)
        .length,
      baja: inventories?.filter((inventary) => inventary.status == 3).length,
    });
  }, [inventories]);

  useEffect(() => {
    if (users.length > 0 || inventories.length > 0) {
      const inventoriesByUser = users.map((user) => {
        return {
          id: user.id,
          name: user.firstName + " " + user.lastName.charAt(0),
          inventories: user.inventory,
        };
      });
      const data = inventoriesByUser.map((user) => user.inventories);
      const labels = inventoriesByUser.map((user) => user.name);
      setUsersInventories({ labels, data });
    }
  }, [inventories, users]);

  useEffect(() => {
    const handleGetUsers = async () => {
      await getUsers(time);
    };
    handleGetUsers();
  }, [time]);

  return (
    <div className="flex flex-col min-h-full w-full p-2 md:p-4 gap-4">
      <h1 className="text-xl text-left font-bold text-purple-600">
        Bienvenido
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 4xl:grid-cols-5 gap-4 bg-white p-2 md:p-4 rounded-lg">
        <p className="col-span-2 md:col-span-4 4xl:col-span-5 text-base text-left font-bold text-purple-600">
          Resumen de inventario
        </p>
        {/* Link to inventories */}
        <Link
          to={"/inventario"}
          className="relative h-32 bg-gradient-to-br from-green-400 to-teal-700 rounded-lg shadow-lg flex flex-col justify-center items-center"
        >
          <div className="absolute right-1 top-1">
            <BsDatabaseFill className="text-6xl text-white opacity-50" />
          </div>
          <p className="text-5xl text-white font-bold">
            {!loading ? (
              inventories.length
            ) : (
              <BounceLoader color={"#ffffff"} loading={loading} />
            )}
          </p>
          <h3 className="text-sm text-center lg:text-base text-white font-bold">
            Total de inventario
          </h3>
        </Link>
        <Link
          to={"/inventario?status=1"}
          className="relative h-32 bg-gradient-to-br from-purple-400 to-purple-800 rounded-lg shadow-lg flex flex-col justify-center items-center"
        >
          <div className="absolute right-1 top-1">
            <BsDatabaseFillAdd className="text-6xl text-white opacity-50" />
          </div>
          <p className="text-5xl text-white font-bold">
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
          to={"/inventario?status=2"}
          className="relative h-32 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg shadow-xl flex flex-col justify-center items-center"
        >
          <div className="absolute right-1 top-1">
            <BsDatabaseFillDash className="text-6xl text-white opacity-50" />
          </div>
          <p className="text-5xl text-white font-bold">
            {!loading ? (
              countInventories.propuestaBaja
            ) : (
              <BounceLoader color={"#ffffff"} loading={loading} />
            )}
          </p>
          <h3 className="text-sm text-center lg:text-base text-white font-bold">
            Propuesta para baja
          </h3>
        </Link>
        <Link
          to={"/inventario?status=3"}
          className="relative h-32 bg-gradient-to-br from-red-400 to-red-700 rounded-lg shadow-xl flex flex-col justify-center items-center"
        >
          <div className="absolute right-1 top-1">
            <BsDatabaseFillDash className="text-6xl text-white opacity-50" />
          </div>
          <p className="text-5xl text-white font-bold">
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
      <div className="bg-white p-2 md:p-4 rounded-lg">
        <p className="col-span-2 md:col-span-4 4xl:col-span-5 pb-2 text-base text-left font-bold text-purple-600">
          Reportes
        </p>
        <div className="grid grid-cols-2 gap-8 md:gap-4">
          <div className="p-4 h-60 col-span-2 md:col-span-1 flex flex-col justify-center items-center md:border-r border-gray-300">
            <p className="text-base text-center pb-3 font-bold">
              <span className="text-neutral-600 font-bold">
                Registros por estado
              </span>{" "}
            </p>
            <Doughnut
              data={{
                labels: ["Alta", "Propuesta Baja", "Baja"],
                datasets: [
                  {
                    label: "Inventario",
                    data: [
                      countInventories.alta,
                      countInventories.propuestaBaja,
                      countInventories.baja,
                    ],
                    backgroundColor: ["#7E3AF2", "#FF8A4C", "#EF4444"],
                    borderColor: ["#7E3AF2", "#FF8A4C", "#EF4444"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                  },
                },
              }}
            />
          </div>
          <div className="w-full col-span-2 border-b md:border-b-0 border-gray-300 md:hidden"></div>
          <div className="p-4 h-60 col-span-2 md:col-span-1 flex flex-col justify-center items-center">
            <div className="w-full text-sm px-2 pb-4 font-bold flex justify-between items-center gap-2">
              <span className="text-neutral-600 truncate font-bold">
                Usuario / Tiempo
              </span>{" "}
              <span className="grid grid-cols-5 items-center gap-1">
                <p
                  onClick={() => setTime(1)}
                  className="text-xs text-center text-gray-400 shadow-md p-2 cursor-pointer border border-neutral-100 rounded-md hover:bg-purple-600 hover:text-white ease-in-out duration-100 transition"
                >
                  1
                </p>
                <p
                  onClick={() => setTime(7)}
                  className="text-xs text-center text-gray-400 shadow-md p-2 cursor-pointer border border-neutral-100 rounded-md hover:bg-purple-600 hover:text-white ease-in-out duration-100 transition"
                >
                  7
                </p>
                <p
                  onClick={() => setTime(14)}
                  className="text-xs text-center text-gray-400 shadow-md p-2 cursor-pointer border border-neutral-100 rounded-md hover:bg-purple-600 hover:text-white ease-in-out duration-100 transition"
                >
                  14
                </p>
                <p
                  onClick={() => setTime(21)}
                  className="text-xs text-center text-gray-400 shadow-md p-2 cursor-pointer border border-neutral-100 rounded-md hover:bg-purple-600 hover:text-white ease-in-out duration-100 transition"
                >
                  21
                </p>
                <p
                  onClick={() => setTime(31)}
                  className="text-xs text-center text-gray-400 shadow-md p-2 cursor-pointer border border-neutral-100 rounded-md hover:bg-purple-600 hover:text-white ease-in-out duration-100 transition"
                >
                  Mes
                </p>
              </span>
            </div>
            <Line
              data={{
                labels: usersInventories.labels,
                datasets: [
                  {
                    label: "Inventario",
                    data: usersInventories.data,
                    backgroundColor: "#7E3AF2",
                    borderColor: "#7E3AF2",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 4xl:grid-cols-5 gap-4 bg-white p-2 md:p-4 rounded-lg">
        <p className="col-span-2 md:col-span-4 4xl:col-span-5 text-base text-left font-bold text-purple-600">
          Accesos directos
        </p>
        <Link
          to={"/inventario"}
          className="bg-white min-h-[24vh] rounded-lg shadow-lg relative flex flex-col justify-center items-center gap-3 group overflow-hidden hover:shadow-xl transition ease-in-out duration-200"
        >
          <img
            src={Bodega}
            className="hover:scale-125 transition ease-in-out duration-200 w-full min-h-full h-auto rounded-lg"
            alt="Inventario"
          />
          <h2 className="text-sm sm:text-lg xl:text-xl text-white text-right p-3 font-bold absolute bottom-0 right-0 bg-purple-700/60 w-full rounded-b-lg">
            Control de Inventario
          </h2>
        </Link>
        <Link
          to={"/inventario"}
          className="bg-white min-h-[24vh] rounded-lg shadow-lg relative flex flex-col justify-center items-center gap-3 group overflow-hidden hover:shadow-xl transition ease-in-out duration-200"
        >
          <img
            src={Reports}
            className="hover:scale-125 transition ease-in-out duration-200 w-full min-h-full h-auto rounded-lg"
            alt="Inventario"
          />
          <h2 className="text-sm sm:text-lg xl:text-xl text-white text-right p-3 font-bold absolute bottom-0 right-0 bg-purple-700/60 w-full rounded-b-lg">
            Generar Reportes
          </h2>
        </Link>
        <Link
          to={"/users"}
          className="bg-white min-h-[24vh] rounded-lg shadow-lg relative flex flex-col justify-center items-center gap-3 group overflow-hidden hover:shadow-xl transition ease-in-out duration-200"
        >
          <img
            src={Users}
            className="hover:scale-125 transition ease-in-out duration-200 w-full min-h-full h-auto rounded-lg"
            alt="Inventario"
          />
          <h2 className="text-sm sm:text-lg xl:text-xl text-white text-right p-3 font-bold absolute bottom-0 right-0 bg-purple-700/60 w-full rounded-b-lg">
            Gestión de usuarios
          </h2>
        </Link>
        <Link
          to={"/companies"}
          className="bg-white min-h-[24vh] rounded-lg shadow-lg relative flex flex-col justify-center items-center gap-3 group overflow-hidden hover:shadow-xl transition ease-in-out duration-200"
        >
          <img
            src={Companies}
            className="hover:scale-125 transition ease-in-out duration-200 w-full min-h-full h-auto rounded-lg"
            alt="Companies imagen"
          />
          <h2 className="text-sm sm:text-lg xl:text-xl text-white text-right p-3 font-bold absolute bottom-0 right-0 bg-purple-700/60 w-full rounded-b-lg">
            Control de Compañias
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Home;
