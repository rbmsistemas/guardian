import React from "react";
import classNames from "classnames";
import { Label } from "flowbite-react";
import { formatLocalDate } from "./getFormatedDate";
import toast from "react-hot-toast";
import getFormatedStatus from "./getFormatedStatus";
import { IoCopyOutline } from "react-icons/io5";

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
      <Label htmlFor="createdAt" value={title} />
      <div
        onDoubleClick={handleCopyProperty}
        className={`text-neutral-700 ${
          id == "status" && value == 1
            ? "bg-green-200 text-green-500"
            : value == 2
            ? "bg-amber-200 text-amber-500"
            : value == 3
            ? "bg-red-200 text-red-500"
            : null
        } w-full flex gap-2 justify-between py-2 px-1 items-center `}
      >
        <p className={`flex items-center gap-2`}>
          <span>
            <Icon
              className={`text-blue-500 ${
                id == "status" && value == 1
                  ? "text-green-500"
                  : value == 2
                  ? "text-amber-500"
                  : value == 3
                  ? "text-red-500"
                  : null
              } text-xl`}
            />
          </span>
          {type === "date"
            ? formatLocalDate(value)
            : id === "status"
            ? getFormatedStatus(value)
            : value}
        </p>
        {/* {value?.length > 0 && (
          <span className="text-2xl" onClick={handleCopyProperty}>
            <IoCopyOutline
              className={classNames(
                "text-stone-600 bg-neutral-200 inline p-1 rounded-md cursor-pointer transition ease-in-out duration-200 hover:bg-purple-500 hover:text-white"
              )}
            />
          </span>
        )} */}
      </div>
    </div>
  );
};

export default InventoryDetail;
