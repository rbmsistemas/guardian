import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import CreateInventario from "./CreateInventario";
import EditarInventario from "./EditarInventario";
import { FiChevronRight } from "react-icons/fi";
import { MdSaveAlt } from "react-icons/md";

const InventaryForm = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    inventaryType: "",
    otherInventary: "",
    brandType: "",
    otherBrand: "",
    model: "",
    otherModel: "",
    sn: "",
    activo: "",
    comment: "",
    status: "",
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (id) console.log(id);
  }, [id]);

  return (
    <div className="min-h-full h-auto w-full p-5">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <FaHome className="text-xl" />
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="/Inventario" className="text-gray-500 hover:text-gray-700">
            Inventario
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="#" className="text-gray-500 hover:text-gray-700">
            Nuevo inventario
          </Link>
        </div>
        <Link
          to="/inventario"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
        >
          <span>
            <IoArrowBack className="text-white text-lg" />
          </span>
          Cancelar
        </Link>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold"></h2>
        <form className="flex flex-col gap-5 mt-5">
          {id ? (
            <EditarInventario data={data} setData={setData} />
          ) : (
            <CreateInventario
              body={data}
              setBody={setData}
              images={images}
              setImages={setImages}
            />
          )}
          {/* boton guardar */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
            >
              <span>
                <MdSaveAlt className="text-white text-lg" />
              </span>
              Guardar inventario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventaryForm;
