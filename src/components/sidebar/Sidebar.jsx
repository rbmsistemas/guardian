import React, { useContext, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUserEdit, FaUsers } from "react-icons/fa";
import {
  MdDashboard,
  MdGavel,
  MdLan,
  MdOutlineInventory2,
  MdSupport,
} from "react-icons/md";
import { Tb3DCubeSphere, TbReportSearch } from "react-icons/tb";
import { PiUserFocusFill } from "react-icons/pi";
import { IoIosSwitch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import ItemSidebar from "./ItemSidebar";
import { FormatedUrlImage } from "../../utils/FormatedUrlImage";
import { Base_Company } from "../../context/Models";
import ModalImageViewer from "../../components/modals/ModalImageViewer";

const Side = ({
  user = {
    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rol: 0,
    photo: "",
    createdAt: "",
    updatedAt: "",
    companyId: "",
    company: Base_Company,
  },
}) => {
  const { postSignout } = useContext(Context);
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [modal, setModal] = useState(false);

  const closeSession = () => {
    postSignout();
    navigate("/");
  };

  let itemsSidebar = [
    {
      name: "Dashboard",
      icon: MdDashboard,
      onClick: () => navigate("/"),
      allowedRoles: [1, 2],
      disabled: false,
    },
    {
      name: "Inventarios",
      icon: MdOutlineInventory2,
      onClick: () => navigate("/inventario"),
      isDropMenu: true,
      allowedRoles: [1, 2],
      disabled: false,
      dropmenu: [
        {
          name: "Modelos",
          icon: Tb3DCubeSphere,
          onClick: () => navigate("/inventario/modelos"),
          allowedRoles: [1, 2],
          disabled: false,
        },
        {
          name: "Asignaciones",
          icon: PiUserFocusFill,
          onClick: () => navigate("/asignaciones"),
          allowedRoles: [1, 2],
          disabled: false,
        },
        {
          name: "Remplazos",
          icon: IoIosSwitch,
          onClick: () => navigate("/remplazos"),
          allowedRoles: [1, 2],
          disabled: false,
        },
      ],
    },
    {
      name: "Reportes",
      icon: TbReportSearch,
      onClick: () => navigate("/inventario"),
      allowedRoles: [1, 2],
      disabled: false,
    },
    {
      name: "Actividades",
      icon: MdGavel,
      onClick: () => navigate("/actividades"),
      allowedRoles: [1, 2],
      disabled: false,
    },
    {
      name: "Compañias",
      icon: MdLan,
      onClick: () => navigate("/companies"),
      allowedRoles: [1, 2],
      disabled: false,
    },
    {
      name: "Usuarios",
      icon: FaUsers,
      onClick: () => navigate("/usuarios"),
      allowedRoles: [1],
      disabled: false,
    },
  ];

  let auxItemsSidebar = [
    {
      name: "Soporte",
      icon: MdSupport,
      onClick: () => navigate("/support"),
      allowedRoles: [],
      disabled: false,
    },
  ];

  if (user.id) {
    auxItemsSidebar.unshift({
      name: "Cerrar sesión",
      icon: AiOutlineLogout,
      onClick: () => closeSession(),
      allowedRoles: [],
      disabled: false,
    });
  } else {
    itemsSidebar.push({
      name: "Iniciar sesión",
      icon: AiOutlineLogout,
      onClick: () => navigate("/"),
      allowedRoles: [],
      disabled: false,
    });
  }

  return (
    <div className={`min-h-[calc(100vh-5rem)] w-[17rem] p-4 relative`}>
      {user.id && (
        <>
          <div
            onMouseEnter={() => setShowEditProfile(true)}
            onMouseLeave={() => setShowEditProfile(false)}
            className="relative w-full flex flex-col justify-center items-center mb-4"
          >
            <FaUserEdit
              onClick={() => navigate("/perfil")}
              size={24}
              className={`absolute text-purple-700 top-0 right-0 p-1 bg-neutral-200 rounded-md cursor-pointer transition ease-in-out duration-200 ${
                showEditProfile ? "scale-100" : "scale-0"
              } `}
            />

            <div className="relative w-fit h-fit">
              <img
                src={FormatedUrlImage(user.photo)}
                className="h-14 w-14 bg cursor-pointer object-cover rounded-full ring-2 p-1 ring-purple-300 mb-2"
                alt={user.userName}
                onClick={() => {
                  setImageSelected({ image: user.photo, name: user.userName });
                  setModal(true);
                }}
              />
              <img
                src={FormatedUrlImage(user.company.logo)}
                className="absolute bg-white p-1 cursor-pointer bottom-0 -right-2 h-6 w-6 object-cover rounded-full mb-2"
                alt={user.company.name}
                onClick={() => {
                  setImageSelected({
                    image: user.company.logo,
                    name: user.company.name,
                  });
                  setModal(true);
                }}
              />
            </div>
            <p className="text-white text-sm whitespace-normal">
              {user.firstName + " " + user.lastName}
            </p>
            <p className="text-white text-xs truncate w-full">
              {user.company.name}
            </p>
          </div>
          <hr className="border-white border-opacity-10 border-2 w-full mb-4" />
        </>
      )}
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-3 overflow-y-auto">
          {itemsSidebar.map((item) => (
            <ItemSidebar
              key={item.name}
              name={item.name}
              onClick={item.onClick}
              disabled={item.disabled}
              allowedRoles={item.allowedRoles}
              userRol={user.rol}
              icon={item.icon}
              dropmenu={item.dropmenu}
            />
          ))}
        </div>
        <div className="w-[calc(17rem-2rem)] flex flex-col gap-3 absolute bottom-4 left-4">
          {auxItemsSidebar.map((item) => (
            <ItemSidebar
              key={item.name}
              name={item.name}
              onClick={item.onClick}
              disabled={item.disabled}
              allowedRoles={item.allowedRoles}
              userRol={user.rol}
              icon={item.icon}
              isDropMenu={item.isDropMenu}
              dropmenu={item.dropmenu}
            />
          ))}
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

export default Side;
