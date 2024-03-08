import { Tooltip } from "flowbite-react";
import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";
import getMacFormat from "../../utils/getMacFormat";
import { IoCopyOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const InventoryDetailsView = ({ data }) => {
  const notifySuccess = () => toast.success("Copiado al portapapeles");

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess();
  };

  return (
    <div className="w-full flex gap-4 flex-wrap py-3">
      {data.map(
        (pair, index) =>
          pair.key !== "id" &&
          pair.value !== null &&
          pair.value !== "" && (
            <div
              key={index}
              className="min-w-48 ring-1 ring-neutral-200 rounded-sm p-3 flex flex-col gap-1"
            >
              <div className="flex justify-between items-center gap-4">
                <p className="font-bold text-sm uppercase text-stone-600">
                  {pair.key}
                </p>
                <div className="flex justify-center items-center gap-2">
                  <Tooltip content="Copiar" position="top">
                    <p
                      onClick={() => handleCopyToClipboard(pair.value)}
                      className="cursor-pointer p-2 rounded-md bg-gray-200 inline-flex items-center justify-center transition ease-in-out duration-200 hover:bg-gray-400 hover:text-white"
                    >
                      <IoCopyOutline />
                    </p>
                  </Tooltip>
                  <Tooltip content="Ver grupo" position="top">
                    <Link
                      to={
                        "/inventario/grupos?type=" +
                        pair.key +
                        "&name=" +
                        pair.value
                      }
                      className="cursor-pointer p-2 rounded-md bg-purple-400 text-purple-800 inline-flex items-center justify-center transition ease-in-out duration-200 hover:bg-purple-900 hover:text-white"
                    >
                      <FaLayerGroup />
                    </Link>
                  </Tooltip>
                </div>
              </div>
              <p>
                {pair.value
                  ? pair.key === "mac"
                    ? getMacFormat(pair.value)
                    : pair.value
                  : "N/A"}
              </p>
            </div>
          )
      )}
    </div>
  );
};

export default InventoryDetailsView;
