import React, { useContext, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FaLayerGroup, FaRegSadCry, FaUserEdit, FaUsers } from "react-icons/fa";
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
      href: "/",
      allowedRoles: [1, 2],
      disabled: false,
    },
    {
      name: "Inventarios",
      icon: MdOutlineInventory2,
      href: "/inventario",
      isDropMenu: true,
      allowedRoles: [1, 2],
      disabled: false,
      dropmenu: [
        {
          name: "Modelos",
          icon: Tb3DCubeSphere,
          href: "/inventario/modelos",
          allowedRoles: [1, 2],
          disabled: false,
        },
        {
          name: "Grupos",
          icon: FaLayerGroup,
          href: "/inventario/grupos",
          allowedRoles: [1, 2],
          disabled: false,
        },
        {
          name: "Asignaciones",
          icon: PiUserFocusFill,
          href: "/asignaciones",
          allowedRoles: [1, 2],
          disabled: false,
        },
        {
          name: "Remplazos",
          icon: IoIosSwitch,
          href: "/remplazos",
          allowedRoles: [1, 2],
          disabled: false,
        },
      ],
    },
    {
      name: "Reportes",
      icon: TbReportSearch,
      href: "/reportes",
      allowedRoles: [1, 2],
      disabled: false,
    },
    {
      name: "Actividades",
      icon: MdGavel,
      href: "/actividades",
      allowedRoles: [1, 2],
      disabled: false,
    },
    {
      name: "Compañias",
      icon: MdLan,
      href: "/companies",
      allowedRoles: [1, 2],
      disabled: false,
    },
    {
      name: "Usuarios",
      icon: FaUsers,
      href: "/usuarios",
      allowedRoles: [1],
      disabled: false,
    },
  ];

  let auxItemsSidebar = [];

  if (user.id) {
    auxItemsSidebar.unshift(
      {
        name: "Cerrar sesión",
        icon: AiOutlineLogout,
        onClick: () => closeSession(),
        allowedRoles: [],
        disabled: false,
      },
      {
        name: "Soporte",
        icon: MdSupport,
        href: "/support",
        allowedRoles: [],
        disabled: false,
      }
    );
  } else {
    itemsSidebar.push(
      {
        name: "Iniciar sesión",
        icon: AiOutlineLogout,
        href: "/",
        allowedRoles: [],
        disabled: false,
      },
      {
        name: "Soporte",
        icon: MdSupport,
        href: "/support",
        allowedRoles: [],
        disabled: false,
      }
    );
  }
  if (localStorage.getItem("pride") === "/pride") {
    auxItemsSidebar.unshift({
      name: "Oprimir",
      icon: FaRegSadCry,
      onClick: () => {
        localStorage.removeItem("pride");
        window.location.reload();
      },
      allowedRoles: [],
      disabled: false,
    });
  }

  return (
    <div className="h-[100vh] relative">
      {user.id && (
        <>
          <div
            onMouseEnter={() => setShowEditProfile(true)}
            onMouseLeave={() => setShowEditProfile(false)}
            className="h-[22vh] p-4 pt-8 relative text-center flex flex-col justify-center items-center"
          >
            <div className="relative w-fit h-fit pb-2">
              {user?.photo ? (
                <img
                  src={FormatedUrlImage(user.photo)}
                  className="h-16 w-16 bg cursor-pointer object-cover rounded-full ring-2 p-1 ring-purple-300"
                  alt={user.userName}
                  onClick={() => {
                    setImageSelected({
                      image: user.photo,
                      name: user.userName,
                    });
                    setModal(true);
                  }}
                />
              ) : (
                <div className="h-16 w-16 bg cursor-pointer object-cover rounded-full ring-2 p-1 ring-purple-300 flex justify-center items-center">
                  <p className="text-white text-lg whitespace-normal w-full h-full rounded-full bg-gradient-to-tr from-gap-orange to-orange-300 flex justify-center items-center font-bold">
                    {user.firstName[0] + user.lastName[0]}
                  </p>
                </div>
              )}
              <img
                src={FormatedUrlImage(user.company.logo)}
                className="absolute bg-white ring-1 ring-purple-300 cursor-pointer bottom-2.5 -right-1.5 h-6 w-6 object-cover rounded-full"
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
              <span>
                <FaUserEdit
                  onClick={() => navigate("/perfil")}
                  size={24}
                  className={`text-purple-700 inline p-1 ml-3 bg-neutral-200 rounded-md cursor-pointer transition ease-in-out duration-200 ${
                    showEditProfile ? "scale-100" : "scale-0"
                  } `}
                />
              </span>
            </p>
            <p className="text-white text-xs whitespace-normal w-full">
              {user.company.name}
            </p>
          </div>
          <hr className="border-white border-opacity-10 border-2 w-full" />
        </>
      )}
      <div className="flex flex-col justify-between h-[78vh] py-4 md:py-2">
        <div className="h-[50vh] md:h-[63]">
          {itemsSidebar.map((item) => (
            <ItemSidebar
              key={item.name}
              name={item.name}
              href={item?.href}
              onClick={item?.onClick}
              disabled={item.disabled}
              allowedRoles={item.allowedRoles}
              userRol={user.rol}
              icon={item.icon}
              dropmenu={item.dropmenu}
            />
          ))}
        </div>
        <div className="h-auto">
          {auxItemsSidebar.map((item) => (
            <ItemSidebar
              key={item.name}
              name={item.name}
              href={item?.href}
              onClick={item?.onClick}
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
          images={[imageSelected?.image] ?? []}
          title={imageSelected?.name ?? ""}
          show={modal}
          onClose={() => setModal(false)}
          isDownloadImage={true}
        />
      )}
    </div>
  );
};

export default Side;
