import React from "react";
import not from "../../assets/img/404_nobg.png";

const NotFound = () => {
  return (
    <div className="min-h-full w-full flex justify-center flex-col items-center">
      <h2 className="text-4xl font-bold text-center">
        404 - Página no encontrada
      </h2>
      <img src={not} alt="404" className="" />
    </div>
  );
};

export default NotFound;
