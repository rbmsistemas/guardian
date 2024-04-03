import React, { useState, useRef, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { MdClose, MdOutlineKeyboardArrowDown } from "react-icons/md";
import classNames from "classnames";

export const DropdownList = ({
  options,
  selectedOption,
  onSelect,
  count,
  itemsClassName,
}) => {
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
      className="mt-2 pt-1 min-w-full w-full whitespace-nowrap md:w-max max-h-[44vh] overflow-y-auto overflow-x-hidden border border-gray-300 bg-white rounded-md shadow-lg absolute z-30"
      ref={dropdownRef}
    >
      {options.map((option, i) => (
        <div
          key={i}
          onClick={() => onSelect(option)}
          className={classNames(
            "py-2 text-sm pl-4 w-full cursor-pointer flex justify-between text-neutral-700 items-center border-b border-neutral-200 transition ease-in-out duration-100",
            {
              "text-green-500": "0" == option.value,
              "bg-blue-500 text-white":
                selectedOption && selectedOption.value === option.value,
              "hover:bg-purple-800 hover:text-white":
                selectedOption?.value !== option.value,
            },
            { [itemsClassName]: itemsClassName }
          )}
        >
          <span>
            {count && (
              <span className="text-gray-400 text-xs">
                {i + 1} {". "}
              </span>
            )}{" "}
            {option.label}
          </span>
          {option.value == "0" && (
            <FaPlusCircle
              size={18}
              className={`bg-white rounded-full text-xl mr-4 ${
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
  onBlur,
  itemsClassName,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState(data ?? []);
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
            className={classNames(
              `absolute text-lg left-3 top-1/2 transform ${
                !disabled && "text-gray-500"
              } -translate-y-1/2`,
              { "text-gray-400": disabled && !inputValue },
              { "text-red-500": error }
            )}
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
            `w-full py-2 pl-10 pr-3 font-light ${
              disabled && "bg-gray-100"
            } border border-gray-100 rounded-md focus:outline-none focus:border-blue-500`,
            { "pl-10": Icon },
            {
              "ring-2 ring-red-400 text-red-600": error,
            },
            { [className]: className }
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
          onBlur={onBlur}
        />
        <div
          className={classNames(
            `absolute right-3 top-1/2 transform -translate-y-1/2 ${
              !disabled && "cursor-pointer"
            } flex items-center gap-2`,
            { "text-gray-400": !inputValue && !disabled },
            { "text-gray-300": disabled },
            { "text-gray-400": disabled && !inputValue },
            { "text-red-500": error }
          )}
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
        {error && (
          <span className="absolute text-xs text-red-500 -bottom-5 right-3">
            {error}
          </span>
        )}
      </div>
      {showDropdown && (
        <DropdownList
          options={filteredData}
          selectedOption={selectedOption}
          onSelect={handleSelectOption}
          count={count}
          itemsClassName={itemsClassName}
        />
      )}
    </div>
  );
};

export default AutocompleteInput;
