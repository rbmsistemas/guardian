import React, { useState, useRef, useEffect } from "react";
import { MdClose, MdOutlineKeyboardArrowDown } from "react-icons/md";
import classNames from "classnames";

const DropdownList = ({ options, selectedOption, onSelect }) => {
  return (
    <ul className="mt-2 w-full max-h-52 overflow-y-auto border border-gray-300 bg-white rounded-md shadow-lg absolute z-30">
      {options.map((option) => (
        <li
          key={option.value}
          onClick={() => onSelect(option)}
          className={classNames("py-2 px-3 cursor-pointer", {
            "bg-blue-500 text-white":
              selectedOption && selectedOption.value === option.value,
            "hover:bg-yellow-300":
              selectedOption && selectedOption.value !== option.value,
          })}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};

const AutocompleteInput = ({
  data,
  value,
  onChange,
  placeholder = "Escribe aquí...",
  icon: Icon,
  disabled = false,
  isClearable = false,
  isOtherOption = false,
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

    const filteredOptions = data.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
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
          type="text"
          className={classNames(
            `w-full py-3 pl-10 pr-3 ${
              disabled && "bg-gray-100"
            } border border-gray-300 rounded-md focus:outline-none focus:border-blue-500`,
            { "pl-10": Icon }
          )}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onClick={toggleDropdown}
          ref={inputRef}
          disabled={disabled}
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
