import React from "react";
import { Label } from "flowbite-react";
import { formatLocalDate } from "./getFormatedDate";
import toast from "react-hot-toast";
import getFormatedStatus from "./getFormatedStatus";

const InventoryDetail = ({
  id = "",
  title = "",
  value = "",
  type = "text",
  icon: Icon,
}) => {
  const successNotify = (text) => toast.success(text);

  const handleCopyProperty = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    successNotify(`Se ha copiado el valor de ${title}`);
  };

  return (
    <div key={id} className="w-full flex flex-col justify-center items-start">
      <Label htmlFor={title} value={title} />
      <div
        onDoubleClick={handleCopyProperty}
        className={`text-neutral-700 ${
          id == "status" && value == 1
            ? "bg-green-200"
            : id == "status" && value == 2
            ? "bg-amber-200"
            : id == "status" && value == 3
            ? "bg-red-200"
            : null
        } w-full flex gap-2 justify-between py-2 px-1 items-center`}
      >
        <p
          className={`flex items-center gap-2 ${
            id == "status" && value == 1
              ? "text-green-500 font-bold"
              : id == "status" && value == 2
              ? "text-amber-500 font-bold"
              : id == "status" && value == 3
              ? "text-red-500 font-bold"
              : null
          }`}
        >
          <span>
            <Icon
              className={`${
                id == "status" && value == 1
                  ? "text-green-500"
                  : id == "status" && value == 2
                  ? "text-amber-500"
                  : id == "status" && value == 3
                  ? "text-red-500"
                  : "text-blue-500"
              } text-xl`}
            />
          </span>
          {type === "date"
            ? formatLocalDate(value)
            : id === "status"
            ? getFormatedStatus(value)
            : value}
        </p>
      </div>
    </div>
  );
};

export default InventoryDetail;
