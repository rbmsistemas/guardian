import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/Context";
import {
  BsDatabaseFill,
  BsDatabaseFillAdd,
  BsDatabaseFillDash,
} from "react-icons/bs";
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
  BarController,
  BarElement,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import MostModelsChart from "./charts/MostModelsChart";
import RecentsTable from "./charts/RecentsTable";
import { formatedInventoriesForTable } from "../../utils/FormatedInventoriesForTable";
import { FaArrowAltCircleRight } from "react-icons/fa";

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
  BarController,
  BarElement
);

const Home = () => {
  const { inventories, getInventories, users, getUsers, user } =
    useContext(Context);

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
  const [registersByMonth, setRegistersByMonth] = useState({
    months: [],
    data: [],
  });

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
      const inventoriesByUser = users.map((item) => {
        if (item?.company?.id === user?.user?.companyId) {
          return {
            id: item?.id,
            name: item?.firstName + " " + item?.lastName.charAt(0),
            inventories: item?.inventory,
          };
        }
      });
      const data = inventoriesByUser.map((user) => user?.inventories);
      const labels = inventoriesByUser.map((user) => user?.name);
      setUsersInventories({ labels, data });
    }
  }, [inventories, users]);

  useEffect(() => {
    if (users.length > 0 || inventories.length > 0) {
      const separateByMonth = (inventories) => {
        const months = [];
        const data = [];
        inventories?.forEach((inventory) => {
          const createdAt = inventory?.createdAt;
          if (createdAt) {
            const month = new Date(createdAt).getUTCMonth();
            if (!months.includes(month)) {
              months.push(month);
              data.push(1);
            } else {
              const index = months.indexOf(month);
              data[index] += 1;
            }
          }
        });
        return { months, data };
      };

      const { months, data } = separateByMonth(inventories);
      let monthsNames = [];
      months?.forEach((month) => {
        let monthDate = new Date();
        monthDate.setUTCMonth(month);
        monthsNames.push(
          new Intl.DateTimeFormat("es-ES", { month: "long" }).format(monthDate)
        );
      });
      setRegistersByMonth({ months: monthsNames, data });
    }
  }, [inventories, users]);

  useEffect(() => {
    const handleGetUsers = async () => {
      await getUsers(time);
    };
    handleGetUsers();
  }, [time]);

  return (
    <div className="grid grid-cols-12 content-start min-h-full w-full h-full p-4 gap-4">
      <div className="col-span-12 bg-white p-2 px-4 rounded-md">
        <h1 className="text-base md:text-xl text-left font-normal text-purple-600">
          Bienvenido de nuevo,
          <span className="font-semibold"> {user?.user?.firstName}!</span>
        </h1>
        <p className="text-sm md:text-base text-left text-neutral-500 col-span-12">
          Aquí encontrarás un resumen de los movimientos recientes en el
          sistema.
        </p>
      </div>
      <div className="grid grid-cols-12 col-span-12 4xl:col-span-6 gap-2 md:gap-4 rounded-lg">
        {/* Link to inventories */}
        <Link
          to={"/inventario"}
          className="col-span-6 md:col-span-3 4xl:col-span-6 h-32 md:h-48 bg-gradient-to-tr from-green-400 to-teal-700 rounded-lg shadow-lg flex flex-col-reverse p-3"
        >
          <div className="bg-white/25 text-teal-700 p-2 rounded-full flex gap-1 md:gap-2 items-center justify-center">
            <BsDatabaseFill className="text-2xl md:text-4xl" />
            <h3 className="hidden md:inline-block text-xs md:text-sm text-center lg:text-base font-bold">
              Total de inventario
            </h3>
            <h3 className="md:hidden text-xs md:text-sm text-center lg:text-base font-bold">
              Total
            </h3>
          </div>
          <p className="text-4xl md:text-5xl text-white font-bold flex justify-center items-center h-full">
            {!loading ? (
              <span>
                {inventories.length
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            ) : (
              <BounceLoader
                color={"#ffffff"}
                loading={loading}
                className="text-lg"
              />
            )}
          </p>
        </Link>
        <Link
          to={"/inventario?status=1"}
          className="col-span-6 md:col-span-3 4xl:col-span-6 h-32 md:h-48 bg-gradient-to-tr from-purple-400 to-purple-800 rounded-lg shadow-lg flex flex-col-reverse p-3"
        >
          <div className="bg-white/25 text-purple-800 p-2 rounded-full flex gap-1 md:gap-2 items-center justify-center">
            <BsDatabaseFillAdd className="text-2xl md:text-4xl" />
            <h3 className="hidden md:inline-block text-xs md:text-sm text-center lg:text-base font-bold">
              Equipos en alta
            </h3>
            <h3 className="md:hidden text-xs md:text-sm text-center lg:text-base font-bold">
              Alta
            </h3>
          </div>
          <p className="text-4xl md:text-5xl text-white font-bold flex justify-center items-center h-full">
            {!loading ? (
              <span>
                {countInventories.alta
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            ) : (
              <BounceLoader
                color={"#ffffff"}
                loading={loading}
                className="text-lg"
              />
            )}
          </p>
        </Link>
        <Link
          to={"/inventario?status=2"}
          className="col-span-6 md:col-span-3 4xl:col-span-6 h-32 md:h-48 bg-gradient-to-tr from-orange-300 to-orange-500 rounded-lg shadow-lg flex flex-col-reverse p-3"
        >
          <div className="bg-white/25 text-orange-500 p-2 rounded-full flex gap-1 md:gap-2 items-center justify-center">
            <BsDatabaseFillDash className="text-2xl md:text-4xl" />
            <h3 className="hidden md:inline-block text-xs md:text-sm text-center lg:text-base font-bold">
              Propuesta para baja
            </h3>
            <h3 className="md:hidden text-xs md:text-sm text-center lg:text-base font-bold">
              Propuesta Baja
            </h3>
          </div>
          <p className="text-4xl md:text-5xl text-white font-bold flex justify-center items-center h-full">
            {!loading ? (
              <span>
                {countInventories.propuestaBaja
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            ) : (
              <BounceLoader
                color={"#ffffff"}
                loading={loading}
                className="text-lg"
              />
            )}
          </p>
        </Link>
        <Link
          to={"/inventario?status=3"}
          className="col-span-6 md:col-span-3 4xl:col-span-6 h-32 md:h-48 bg-gradient-to-tr from-red-400 to-red-700 rounded-lg shadow-lg flex flex-col-reverse p-3"
        >
          <div className="bg-white/25 text-red-700 p-2 rounded-full flex gap-1 md:gap-2 items-center justify-center">
            <BsDatabaseFillDash className="text-2xl md:text-4xl" />
            <h3 className="hidden md:inline-block text-xs md:text-sm text-center lg:text-base font-bold">
              Equipos en baja
            </h3>
            <h3 className="md:hidden text-xs md:text-sm text-center lg:text-base font-bold">
              Baja
            </h3>
          </div>
          <p className="text-4xl md:text-5xl text-white font-bold flex justify-center items-center h-full">
            {!loading ? (
              <span>
                {countInventories.baja
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            ) : (
              <BounceLoader
                color={"#ffffff"}
                loading={loading}
                className="text-lg"
              />
            )}
          </p>
        </Link>
      </div>
      <div className="col-span-12 md:col-span-6 p-2 px-4 rounded-md bg-white flex flex-col w-full h-full">
        <p className="font-bold text-center p-2 px-4 bg-purple-400/50 text-purple-700 rounded-full w-fit h-12 flex items-center">
          <span>Modelos con más stock</span>
        </p>
        <div className="h-80">
          <MostModelsChart token={user?.token} />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 p-2 px-4 rounded-md bg-white flex flex-col w-full h-full">
        <p className="font-bold text-center p-2 px-4 bg-purple-400/50 text-purple-700 rounded-full w-fit h-12 flex items-center">
          <span>Porcentaje de registros</span>
        </p>
        <div className="h-72 py-4">
          <Doughnut
            data={{
              labels: ["Alta", "Propuesta Baja", "Baja"],
              datasets: [
                {
                  label: "Inventario",
                  data: [
                    (
                      (countInventories.alta /
                        (countInventories.alta +
                          countInventories.propuestaBaja +
                          countInventories.baja)) *
                      100
                    ).toFixed(2),
                    (
                      (countInventories.propuestaBaja /
                        (countInventories.alta +
                          countInventories.propuestaBaja +
                          countInventories.baja)) *
                      100
                    ).toFixed(2),
                    (
                      (countInventories.baja /
                        (countInventories.alta +
                          countInventories.propuestaBaja +
                          countInventories.baja)) *
                      100
                    ).toFixed(2),
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
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 p-2 px-4 rounded-md bg-white flex flex-col w-full h-full">
        <p className="font-bold text-center p-2 px-4 bg-purple-400/50 text-purple-700 rounded-full w-fit h-12 flex items-center">
          Registros por mes
        </p>
        <div className="h-72 py-4">
          {registersByMonth.months.length > 0 && (
            <Bar
              className="w-full h-full"
              data={{
                labels: registersByMonth.months,
                datasets: [
                  {
                    label: "Inventario",
                    data: registersByMonth.data,
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
          )}
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 p-2 px-4 rounded-md bg-white flex flex-col w-full h-full">
        <div className="font-bold text-center p-2 px-4 bg-purple-400/50 text-purple-700 rounded-full w-full flex justify-between items-center">
          <p className="truncate">Usuario / Tiempo</p>
          <div className="grid grid-cols-5 items-center gap-1">
            <p
              onClick={() => setTime(1)}
              className={`text-sm text-center rounded-full flex justify-center items-center h-8 w-8 cursor-pointer hover:bg-purple-600 hover:text-white ease-in-out duration-100 transition ${
                time === 1 && "bg-purple-600 text-white "
              }`}
            >
              1
            </p>
            <p
              onClick={() => setTime(7)}
              className={`text-sm text-center rounded-full flex justify-center items-center h-8 w-8 cursor-pointer hover:bg-purple-600 hover:text-white ease-in-out duration-100 transition ${
                time === 7 && "bg-purple-600 text-white "
              }`}
            >
              7
            </p>
            <p
              onClick={() => setTime(14)}
              className={`text-sm text-center0 rounded-full flex justify-center items-center h-8 w-8 cursor-pointer hover:bg-purple-600 hover:text-white ease-in-out duration-100 transition ${
                time === 14 && "bg-purple-600 text-white "
              }`}
            >
              14
            </p>
            <p
              onClick={() => setTime(21)}
              className={`text-sm text-center0 rounded-full flex justify-center items-center h-8 w-8 cursor-pointer hover:bg-purple-600 hover:text-white ease-in-out duration-100 transition ${
                time === 21 && "bg-purple-600 text-white "
              }`}
            >
              21
            </p>
            <p
              onClick={() => setTime(31)}
              className={`text-sm text-center0 rounded-full flex justify-center items-center h-8 w-8 cursor-pointer hover:bg-purple-600 hover:text-white ease-in-out duration-100 transition ${
                time === 31 && "bg-purple-600 text-white "
              }`}
            >
              Mes
            </p>
          </div>
        </div>
        <div className="h-72 py-4">
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
      <div className="col-span-12 md:col-span-6 2xl:col-span-12 p-2 px-4 rounded-md bg-white flex flex-col w-full h-full">
        {/* table with recents inventories */}
        <div className="flex justify-between items-center w-full">
          <p className="font-bold text-center p-2 px-4 bg-purple-400/50 text-purple-700 rounded-full w-fit h-12 flex items-center">
            <span>Últimas movimientos</span>
          </p>
          <Link
            to={"/inventario"}
            className="bg-purple-400/50 font-bold text-purple-700 px-4 rounded-full hover:text-white hover:bg-purple-700 h-12 hover ease-in-out duration-100 transition flex items-center justify-center"
          >
            Ver más
            <span className="ml-2">
              <FaArrowAltCircleRight size={24} />{" "}
            </span>
          </Link>
        </div>
        <div className="h-full py-4">
          <RecentsTable
            inventories={
              inventories?.length > 0
                ? formatedInventoriesForTable(inventories?.slice(0, 5))
                : []
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
