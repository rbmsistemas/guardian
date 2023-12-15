import React, { useState, useRef, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { MdClose, MdOutlineKeyboardArrowDown } from "react-icons/md";
import classNames from "classnames";

export const DropdownList = ({ options, selectedOption, onSelect, count }) => {
  const [dropdownPosition, setDropdownPosition] = useState({
    left: 0,
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const positionDropdown = () => {
      if (dropdownRef.current) {
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let newLeft = dropdownPosition.left;
        if (dropdownRect.right > viewportWidth) {
          newLeft -= dropdownRect.right - viewportWidth;
        }

        if (newLeft !== dropdownPosition.left) {
          setDropdownPosition({
            left: newLeft,
          });
        }
      }
    };

    positionDropdown();

    window.addEventListener("resize", positionDropdown);

    return () => {
      window.removeEventListener("resize", positionDropdown);
    };
  }, [dropdownPosition]);

  return (
    <div
      style={{ left: dropdownPosition.left }}
      className="mt-2 min-w-full w-full whitespace-nowrap md:w-max max-h-[44vh] overflow-y-auto overflow-x-hidden border border-gray-300 bg-white rounded-md shadow-lg absolute z-30"
      ref={dropdownRef}
    >
      {options.map((option, i) => (
        <div
          key={i}
          onClick={() => onSelect(option)}
          className={classNames(
            "py-2 font-medium text-sm px-3 w-full cursor-pointer flex justify-between items-center border-b border-gray-300 transition ease-in-out duration-100",
            {
              "text-green-500": "0" == option.value,
              "bg-blue-500 text-white":
                selectedOption && selectedOption.value === option.value,
              "hover:bg-purple-800 hover:text-white":
                selectedOption?.value !== option.value,
            }
          )}
        >
          <>
            {count && <span className="text-gray-400 text-xs">{i}</span>}{" "}
            {option.label}
          </>
          {option.value == "0" && (
            <FaPlusCircle
              className={`${
                selectedOption?.value == option.value
                  ? "text-white"
                  : "text-green-500"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const AutocompleteInput = ({
  id,
  name,
  data,
  value,
  onChange,
  required,
  placeholder = "Escribe aquí...",
  icon: Icon,
  disabled = false,
  isClearable = false,
  cancelWrite = false,
  isOtherOption,
  error,
  setErrors,
  className,
  count,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOtherOption) {
      const otherOption = {
        label: "Otro",
        value: "0",
      };
      const newData = [...data];
      newData.unshift(otherOption);
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  }, [data, isOtherOption]);

  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    setInputValue(value);

    let filteredOptions = data.filter((option) =>
      normalizeString(option.label).toLowerCase().includes(value.toLowerCase())
    );

    if (isOtherOption) {
      const otherOption = {
        label: "Otro",
        value: "0",
      };
      filteredOptions = [...filteredOptions, otherOption];
    }

    setFilteredData(filteredOptions);
    setSelectedOption(null);
    setShowDropdown(true);
  };

  const handleSelectOption = (option) => {
    setInputValue(option.label);
    setSelectedOption(option);
    onChange(option);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    if (disabled) {
      return;
    }
    setShowDropdown(!showDropdown);
  };

  const handleClearInput = () => {
    setInputValue("");
    setSelectedOption(null);
    onChange("");
    inputRef.current.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value) {
      data.filter((option) => {
        if (option.value === value) {
          setInputValue(option.label);
          setSelectedOption(option);
        }
      });
    } else {
      setInputValue("");
      setSelectedOption(null);
    }
  }, [value]);

  return (
    <div className="relative">
      <div className="relative flex items-center group">
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
          onFocus={() => error && setErrors({ ...error, [name]: false })}
          id={id}
          name={name}
          type="text"
          className={classNames(
            `w-full py-3 pl-10 pr-3 capitalize ${
              disabled && "bg-gray-100"
            } border border-gray-300 rounded-md focus:outline-none focus:border-blue-500`,
            { "pl-10": Icon },
            {
              "border-red-500 border-2 shadow-md shadow-red-500/50": error,
            },
            { className }
          )}
          autoComplete="off"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onClick={toggleDropdown}
          ref={inputRef}
          required={required}
          disabled={disabled}
          readOnly={cancelWrite}
        />
        <div
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            !disabled && "cursor-pointer"
          } flex items-center gap-2`}
          onClick={toggleDropdown}
        >
          {isClearable && inputValue && !disabled && (
            <MdClose
              size={18}
              onClick={handleClearInput}
              className="text-gray-400 hover:text-red-500"
            />
          )}
          <MdOutlineKeyboardArrowDown
            size={24}
            className={showDropdown && "rotate-180"}
          />
        </div>
      </div>
      {showDropdown && (
        <DropdownList
          options={filteredData}
          selectedOption={selectedOption}
          onSelect={handleSelectOption}
          count={count}
        />
      )}
    </div>
  );
};

export default AutocompleteInput;
