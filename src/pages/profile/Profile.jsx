import React, { useState, useContext, useEffect } from "react";
import UserProfile from "./UserProfile";
import ChangePassword from "./ChangePassword";
import Context from "../../context/Context";
import { FormatedUrlImage } from "../../utils/FormatedUrlImage";
import ModalImageViewer from "../../components/modals/ModalImageViewer";
import { MdBuild, MdEmail, MdPhone } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(Context);
  const [modal, setModal] = useState(false);
  const [imageSelected, setImageSelected] = useState({
    name: "",
    image: "",
  });
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "profile"
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="">
      <div className="flex justify-center items-center relative">
        <div className="min-h-[14rem] w-full bg-gradient-to-r from-purple-700 to-purple-500"></div>
        <div className="absolute p-4 top-[4rem] w-full h-full min-h-[80vh] grid grid-cols-12 gap-4 justify-center items-center">
          <div className="col-span-12 md:col-span-3 w-full h-full bg-white rounded-md p-4 shadow-xl">
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center">
                <div className=" relative w-[10rem] h-[10rem] rounded-full bg-white flex justify-center items-center">
                  <img
                    onClick={() => {
                      setImageSelected({
                        image: user?.user?.photo,
                        name:
                          user?.user?.firstName + " " + user?.user?.lastName,
                      });
                      setModal(true);
                    }}
                    src={FormatedUrlImage(user?.user?.photo)}
                    alt={user?.user?.firstName + " " + user?.user?.lastName}
                    className="w-[9rem] h-[9rem] rounded-full object-cover cursor-pointer"
                  />
                  <img
                    onClick={() => {
                      setImageSelected({
                        image: user?.user?.company?.logo,
                        name: user?.user?.company?.name,
                      });
                      setModal(true);
                    }}
                    src={FormatedUrlImage(user?.user?.company?.logo)}
                    alt={user?.user?.company?.name}
                    className="w-10 h-10 absolute bg-white p-1 right-3 bottom-4 rounded-full object-cover cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-purple-700 text-center text-xl font-bold">
                  {user?.user?.firstName} {user?.user?.lastName}
                </h1>
              </div>
              <hr className="border-neutral border-opacity-10 border w-full my-4" />
              <p className="text-gray-500 text-sm pb-4">
                Información de Contacto
              </p>
              <div className="w-full flex flex-col justify-start items-start gap-2">
                <div>
                  <p className="text-gray-500 text-sm">Correo Electronico</p>
                  <div className="text-neutral-600 w-full text-sm font-semibold flex items-center gap-2 whitespace-pre-wrap truncate">
                    <MdEmail size={20} />
                    <p>{user?.user?.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Telefono</p>
                  <div className="text-neutral-600 w-full text-sm font-semibold flex items-center gap-2 whitespace-pre-wrap truncate">
                    <MdPhone size={20} />
                    {user?.user?.phone}
                  </div>
                </div>
              </div>
              <hr className="border-neutral border-opacity-10 border w-full my-4" />
              <div className="w-full flex flex-col justify-start items-start">
                <p className="text-gray-500 text-sm">Compañia</p>
                <div className="text-neutral-600 w-full text-sm font-semibold flex gap-2 whitespace-pre-wrap truncate">
                  <FaBuilding size={20} />
                  {user?.user?.company?.name}
                </div>
              </div>
              {/* pill to status */}
              <div className="w-full flex flex-col justify-start items-center pt-6">
                <p
                  className={`text-neutral-600 text-sm font-semibold p-2 rounded-lg ${
                    user?.user?.status
                      ? "bg-green-200 text-green-400"
                      : "bg-red-200 text-red-400"
                  }`}
                >
                  {user?.user?.status ? "Activo" : "Inactivo"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9 w-full h-full bg-white rounded-md p-4 shadow-xl">
            <div className="mx-auto w-full p-4">
              <div className="mb-4 w-full grid grid-cols-3">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`${
                    activeTab === "profile"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } px-4 py-2 border-r-4 border-white rounded-l-md w-full`}
                >
                  Información General
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`${
                    activeTab === "password"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } px-4 py-2 border-r-4 border-white w-full`}
                >
                  Cambiar Contraseña
                </button>
                <button
                  onClick={() => setActiveTab("company")}
                  className={`${
                    activeTab === "company"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } px-4 py-2 rounded-r-md w-full`}
                >
                  Compañia
                </button>
              </div>
              {activeTab === "profile" ? (
                <UserProfile userData={user?.user} />
              ) : (
                <ChangePassword />
              )}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <ModalImageViewer
          images={[imageSelected?.image] || []}
          title={imageSelected?.name || ""}
          show={modal}
          onClose={() => setModal(false)}
          isDownloadImage={true}
        />
      )}
    </div>
  );
};

export default Profile;
