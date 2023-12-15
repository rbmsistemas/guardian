// UserProfile.js
import React, { useState } from "react";
import TextInput from "../../components/inputs/TextInput";
import { Label } from "flowbite-react";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

const UserProfile = ({ userData }) => {
  const [user, setUser] = useState(userData);
  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    // Aquí puedes enviar los datos actualizados al servidor o hacer lo que necesites
    console.log("Datos actualizados:", user);
  };

  //return a view with user info
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 md:col-span-1">
        <Label htmlFor="firstName" value="Nombre" />
        <TextInput
          id="firstName"
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
          isClearable
          placeholder={"Nombre"}
          disabled={!isEdit}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <Label htmlFor="lastName" value="Apellido" />
        <TextInput
          id="lastName"
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
          isClearable
          placeholder={"Apellido"}
          disabled={!isEdit}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <Label htmlFor="phone" value="Teléfono" />
        <TextInput
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
          isClearable
          placeholder={"Teléfono"}
          disabled={!isEdit}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <Label htmlFor="email" value="Correo electrónico" />
        <TextInput
          id="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          isClearable
          placeholder={"Correo electrónico"}
          disabled={true}
        />
      </div>

      <div className="col-span-2 md:col-span-1">
        <Label htmlFor="userName" value="Nombre de usuario" />
        <TextInput
          id="userName"
          name="userName"
          value={user.userName}
          onChange={handleInputChange}
          isClearable
          placeholder={"Nombre de usuario"}
          disabled={true}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <Label htmlFor="status" value="Estado de la cuenta" />
        <TextInput
          id="status"
          name="status"
          value={user.status ? "Activo" : "Inactivo"}
          onChange={handleInputChange}
          isClearable
          placeholder={"Estado de la cuenta"}
          disabled={true}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <Label htmlFor="rol" value="Rol" />
        <TextInput
          id="rol"
          name="rol"
          value={user.rol}
          onChange={handleInputChange}
          isClearable
          placeholder={"Rol"}
          disabled={true}
        />
      </div>
      <div className="col-span-2 flex justify-end gap-2 items-center">
        {isEdit && (
          <button
            onClick={() => setIsEdit(false)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <MdCancel className="text-white text-lg" />
            </span>
            Cancelar
          </button>
        )}
        {isEdit ? (
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <AiFillSave className="text-white text-lg" />
            </span>
            Guardar
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <AiFillEdit className="text-white text-lg" />
            </span>
            Editar
          </button>
        )}
      </div>
    </div>
  );
};
export default UserProfile;
