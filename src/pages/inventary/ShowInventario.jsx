import React, { useEffect, useState } from "react";
import { FakeData } from "./Inventario";
import { useParams } from "react-router-dom";

const ShowInventario = () => {
  // get id from url
  const [inventary, setInventary] = useState({
    inventaryType: "",
    otherInventary: "",
    brandType: "",
    otherBrand: "",
    model: "",
    sn: "",
    activo: "",
    comment: "",
    status: "",
    images: [],
  });
  const [loading, setLoading] = useState(true);
  // get id from the params
  const { id } = useParams();

  useEffect(() => {
    setLoading(false);
    FakeData.find((item) => {
      if (item.id == id) setInventary(item);
    });
  }, []);
  // show the inventaryType, otherInventary, brandType, otherBrand, model, sn, activo, comment, status, images
  return (
    <div className="grid grid-cols-12 w-full h-full gap-3 justify-center items-start p-5 bg-white rounded-lg">
      <div className="col-span-12">
        <h2 className="text-xl font-bold text-gap-primary">
          Inventario - <p className="text-md text-slate-500"></p>{" "}
          {inventary.status == 1 ? "Alta" : "Baja"}{" "}
        </h2>
        <p className=" text-gray-500">
          Tipo de inventario:{" "}
          <span className="text-black">{inventary.inventaryType}</span>
        </p>
        <p className=" text-gray-500">
          Tipo de marca:{" "}
          <span className="text-black">{inventary.brandType}</span>
        </p>
        <p className=" text-gray-500">
          Modelo: <span className="text-black">{inventary.model}</span>
        </p>
        <p className=" text-gray-500">
          Serie: <span className="text-black">{inventary.sn}</span>
        </p>
        <p className=" text-gray-500">
          # Activo: <span className="text-black">{inventary.activo}</span>
        </p>
        <p className=" text-gray-500">
          Comentario: <span className="text-black">{inventary.comment}</span>
        </p>
      </div>
      <div className="col-span-12">
        <p className=" text-gray-500">
          Imagenes: <span className="text-black"></span>
        </p>
      </div>
    </div>
  );
};
export default ShowInventario;
