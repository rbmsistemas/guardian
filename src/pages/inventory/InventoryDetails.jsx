import React from "react";
import { Link } from "react-router-dom";

const InventoryDetailsView = ({ data }) => {
  return (
    <div className="w-full flex gap-2 flex-wrap py-3">
      {data.map(
        (pair, index) =>
          pair.key !== "id" &&
          pair.value !== null &&
          pair.value !== "" && (
            <Link
              to={"/inventario/grupos?type=" + pair.key + "&name=" + pair.value}
              key={index}
              className={`p-2 rounded-md border text-gray-800 hover:underline hover:text-white hover:bg-blue-600 transition-all ease-in-out duration-200`}
            >
              <span id="key" className="font-semibold uppercase">
                {pair.key}
              </span>
              : <span id="value"> {pair.value ? pair.value : "N/A"}</span>
            </Link>
          )
      )}
    </div>
  );
};

export default InventoryDetailsView;
