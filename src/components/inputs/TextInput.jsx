import React, { useState } from "react";
import classNames from "classnames";
import { BiDollar } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { getCurrentFormattedDate } from "../../utils/getFormatedDate";

const TextInput = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required,
  isClearable,
  disabled,
  formatPrice,
}) => {
  const handleClearInput = () => {
    onChange({ target: { value: "" } });
  };

  const validateValue = (value) => {
    if (type === "number" && value) {
      return value.replace(/[^0-9]/g, "");
    } else if (type === "date" && value) {
      value = `${value}T00:00:00.000Z`;
      return value?.split("T")[0];
    }

    return value;
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        {Icon && (
          <div
            className={`absolute text-lg left-3 top-1/2 transform ${
              !disabled && "text-gray-500"
            } -translate-y-1/2`}
          >
            <Icon />
          </div>
        )}
        <input
          id={id}
          type={type}
          required={required}
          max={
            type === "date" ? getCurrentFormattedDate().substring(0, 10) : null
          }
          disabled={disabled}
          className={classNames(
            "w-full py-3 pr-3 placeholder:capitalize focus:outline-none focus:border-blue-500",
            { "pl-10": Icon },
            `${
              disabled
                ? "bg-white-50 border-0 border-b-2 border-gray-300"
                : "bg-white border border-gray-300 rounded-md"
            }`
          )}
          placeholder={placeholder}
          value={validateValue(value)}
          onChange={onChange}
        />
        <div
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            !disabled && "cursor-pointer"
          } flex items-center gap-2`}
        >
          {isClearable && value && !disabled && (
            <MdClose
              size={18}
              onClick={handleClearInput}
              className="text-gray-400 hover:text-red-500"
            />
          )}
          {formatPrice && (
            <BiDollar
              size={20}
              className="text-neutral-400 absolute top-4 right-3"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
