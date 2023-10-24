import React, { useState, useRef, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { MdClose, MdOutlineKeyboardArrowDown } from "react-icons/md";
import classNames from "classnames";

export const DropdownList = ({ options, selectedOption, onSelect }) => {
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
      className="mt-2 w-full whitespace-nowrap md:w-max max-h-[40vh] overflow-y-auto overflow-x-hidden border border-gray-300 bg-white rounded-md shadow-lg absolute z-30"
      ref={dropdownRef}
    >
      {options.map((option) => (
        <li
          key={option.value}
          onClick={() => onSelect(option)}
          className={classNames(
            "py-2 px-3 cursor-pointer flex justify-between items-center border-b border-gray-300 transition ease-in-out duration-100",
            {
              "text-green-500": "0" == option.value,
              "bg-blue-500 text-white":
                selectedOption && selectedOption.value === option.value,
              "hover:bg-yellow-300": selectedOption?.value !== option.value,
            }
          )}
        >
          {option.label}
          {option.value == "0" && (
            <FaPlusCircle
              className={`${
                selectedOption?.value == option.value
                  ? "text-white"
                  : "text-green-500"
              }`}
            />
          )}
        </li>
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
      setFilteredData([...data, otherOption]);
    } else {
      setFilteredData(data);
    }
  }, [data, isOtherOption]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    let filteredOptions = data.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
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
          id={id}
          name={name}
          type="text"
          className={classNames(
            `w-full py-3 pl-10 pr-3 ${
              disabled && "bg-gray-100"
            } border border-gray-300 rounded-md focus:outline-none focus:border-blue-500`,
            { "pl-10": Icon }
          )}
          autoComplete="off"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onClick={toggleDropdown}
          ref={inputRef}
          required={required}
          disabled={disabled}
          readOnly={cancelWrite} // Utiliza readOnly en lugar de disabled
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
        />
      )}
    </div>
  );
};

export default AutocompleteInput;
