import React, { useState, useContext, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Context from "../../context/Context";
import { DropdownList } from "../inputs/AutocompleteInput";
import { useNavigate } from "react-router-dom";
import { RiCloseCircleFill, RiMenuSearchLine } from "react-icons/ri";
import { MdClear } from "react-icons/md";
import { FaRegSadTear } from "react-icons/fa";
import { LuDelete } from "react-icons/lu";
import { Tooltip } from "flowbite-react";

const Searcher = () => {
  const {
    searchedInventories,
    inventoryTypes,
    inventoryBrands,
    getInventoriesBySearch,
  } = useContext(Context);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const inputMobileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearcher, setShowSearcher] = useState(false);

  const handleValidateSearch = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length >= 6) {
      const lastFourChars = inputValue.slice(-6);
      if (
        lastFourChars[0] === lastFourChars[1] &&
        lastFourChars[1] === lastFourChars[2] &&
        lastFourChars[2] === lastFourChars[3] &&
        lastFourChars[3] === lastFourChars[4] &&
        lastFourChars[4] === lastFourChars[5]
      ) {
        return;
      }
    }
    setSearch(inputValue);
    setShowDropdown(true);
  };

  useEffect(() => {
    setIsLoading(true);
    if (search.length <= 0) {
      setIsLoading(false);
      return;
    }

    handleGetInventory();
    setIsLoading(false);
  }, [search]);

  const handleGetInventory = async () => {
    await getInventoriesBySearch({
      inventoryType: "",
      brandType: "",
      search: search,
      advancedSearch,
      status: "",
      page: 1,
      quantityResults: 10,
      orderBy: "updatedAt",
      sort: "DESC",
    });
  };

  let formatedData = searchedInventories?.map((inventory) => ({
    label: `${inventory?.inventoryModel?.name} - ${
      inventoryTypes.find(
        (type) => type?.id === inventory?.inventoryModel?.inventoryTypeId
      )?.name
    } - ${
      inventoryBrands.find(
        (brand) => brand?.id === inventory?.inventoryModel?.inventoryBrandId
      )?.name
    } ${inventory?.serialNumber ? "/ SN " + inventory?.serialNumber : ""}
    ${inventory?.activo ? "/ # " + inventory?.activo : ""}
    `,
    value: inventory?.id,
  }));

  const handleClearInput = () => {
    setSearch("");
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

  const handleShowSearcher = () => {
    setShowSearcher(!showSearcher);
    inputMobileRef.current.focus();
  };

  const showMenu =
    searchedInventories?.length <= 0 ? (
      <div className="flex justify-start gap-1 items-center absolute whitespace-nowrap top-2 md:top-11 h-16 p-2 bg-white/90 w-full min-w-fit rounded-md shadow-md cursor-default ">
        <span>
          <FaRegSadTear size={20} className="text-gap-primary pr-2" />
        </span>
        <p className=" text-black text-sm">
          No se encontraron resultados que coincidan con tu búsqueda
        </p>
      </div>
    ) : (
      <>
        <DropdownList
          options={formatedData}
          count={true}
          onSelect={(value) => {
            setShowSearcher(false);
            setShowDropdown(false);
            navigate(`/inventario/ver/${value?.value}`);
            setSearch("");
          }}
        />
      </>
    );

  return (
    <div className="flex gap-2 relative">
      <div className="relative w-full h-full">
        <div className="hidden w-full md:block">
          <input
            ref={inputRef}
            value={search}
            onChange={handleValidateSearch}
            id="searcher"
            name="searcher"
            type="text"
            placeholder="Buscar..."
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowDropdown(false);
                // navigate with params
                navigate(`/inventario`, { state: { search } });
              }
            }}
            className="bg-transparent rounded-full py-2 px-4 pl-12 w-full max-w-[70vw] focus:outline-none focus:shadow-outline"
          />
          <div className="absolute top-1/2 transform -translate-y-1/2 left-0 ml-3">
            <FaSearch size={18} />
          </div>
          {search.length >= 1 && (
            <div
              onClick={handleClearInput}
              className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-3 cursor-pointer hover:bg-neutral-400/30 rounded-full p-1 transition duration-150 ease-in-out"
            >
              <MdClear size={22} />
            </div>
          )}
          {isLoading ? (
            <div className="flex items-center justify-center absolute top-11 h-16 bg-white/90 w-full rounded-md shadow-md cursor-default">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gap-orange"></div>
            </div>
          ) : (
            showDropdown && showMenu
          )}
        </div>
        <div className="md:hidden relative w-full h-full">
          <div className="flex justify-center items-center border border-neutral-500 rounded-full cursor-pointer p-2 h-10 w-10">
            <FaSearch onClick={handleShowSearcher} className="text-xl" />
          </div>
          <div
            className={`${
              showSearcher
                ? "fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/40 flex flex-col"
                : "hidden"
            }`}
          >
            <div className="p-2 pt-8 flex justify-between items-center w-[100vw] relative">
              <input
                ref={inputMobileRef}
                value={search}
                onChange={handleValidateSearch}
                id="searcher"
                name="searcher"
                type="text"
                placeholder="Buscar..."
                autoComplete="off"
                className="bg-white rounded-full py-2 px-4 pl-12 w-full focus:outline-none focus:shadow-outline"
              />
              <RiCloseCircleFill
                onClick={() => {
                  setSearch("");
                  setShowSearcher(!showSearcher);
                }}
                className="text-4xl cursor-pointer text-white"
              />
              {search.length >= 1 && (
                <div
                  onClick={handleClearInput}
                  className="absolute top-19 right-11 mr-2 cursor-pointer hover:bg-neutral-400/30 rounded-full p-1 transition duration-150 ease-in-out"
                >
                  <LuDelete size={22} />
                </div>
              )}
              <div className="absolute top-11 left-5">
                <FaSearch />
              </div>
            </div>
            <div className="flex justify-center items-center h-56">
              {isLoading ? (
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
              ) : (
                <div className="animate-ping rounded-full h-10 w-10 border-b-2 border-white"></div>
              )}
            </div>
            <div className="absolute top-20 left-0 w-[95vw] p-2">
              {isLoading ? (
                <div className="flex items-center justify-center absolute top-11 h-16 bg-white/90 w-full rounded-md shadow-md cursor-default">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gap-orange"></div>
                </div>
              ) : (
                showDropdown && showMenu
              )}
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
      <Tooltip
        className="whitespace-nowrap"
        content="Búsqueda avanzada"
        placement="bottom"
      >
        <div
          onClick={() => {
            setAdvancedSearch(!advancedSearch);
            inputRef.current.focus();
            setShowSearcher(true);
            setSearch(search);
          }}
          className={`flex justify-center items-center gap-1 h-10 w-10 border
           rounded-full cursor-pointer
          transition ease-in-out duration-100 ${
            advancedSearch
              ? "bg-blue-600 text-white border-white"
              : "text-neutral-500 hover:border-white hover:text-white hover:bg-blue-600 border-neutral-500 "
          } `}
        >
          <RiMenuSearchLine className="text-xl" />
        </div>
      </Tooltip>
    </div>
  );
};

export default Searcher;
