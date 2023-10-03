// ChangePassword.js
import React, { useState } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    // Aquí puedes implementar la lógica para cambiar la contraseña
    console.log("Cambiando contraseña...");
  };

  return (
    <div>
      <h2>Actualizar Contraseña</h2>
      <form>
        <div className="mb-4">
          <label>Contraseña Actual:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label>Confirmar Nueva Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded-md p-2"
          />
        </div>
        <button
          type="button"
          onClick={handleChangePassword}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
