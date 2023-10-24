import React, { useState, useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Context from "../../context/Context";
import { DropdownList } from "../inputs/AutocompleteInput";
import { useNavigate } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";

const Searcher = () => {
  const {
    searchedInventories,
    inventoryTypes,
    inventoryBrands,
    getInventoriesBySearch,
  } = useContext(Context);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
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
  };

  useEffect(() => {
    setIsLoading(true);
    const res = async () => {
      const data = await getInventoriesBySearch({
        inventoryType: "",
        brandType: "",
        search: search,
        status: "",
        page: 1,
        quantityResults: 10,
        orderBy: "updatedAt",
        sort: "DESC",
      });
    };
    res();
    setIsLoading(false);
  }, [search]);

  const formatedData = searchedInventories?.map((inventory) => ({
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

  if (searchedInventories.length === 0) {
    formatedData.push({
      label: "No se encontraron resultados",
      value: "No se encontraron resultados",
    });
  }

  return (
    <div className="relative w-full h-full">
      <div className="hidden w-full md:block">
        <input
          value={search}
          onChange={handleValidateSearch}
          id="searcher"
          name="searcher"
          type="text"
          placeholder="Buscar..."
          className="bg-transparent rounded-full py-2 px-4 pl-12 w-full max-w-[70vw] focus:outline-none focus:shadow-outline"
        />
        <div className="absolute top-0 left-0 mt-3 ml-3">
          <FaSearch />
        </div>
        {search.length >= 1 && (
          <DropdownList
            options={formatedData}
            onSelect={(value) => {
              navigate(`/inventario/ver/${value?.value}`);
              setSearch("");
            }}
          />
        )}
      </div>
      <div className="md:hidden relative w-full h-full">
        <div className="flex justify-center items-center border border-neutral-500 rounded-full p-2 h-10 w-10">
          <FaSearch
            onClick={() => setShowSearcher(!showSearcher)}
            className="text-xl"
          />
        </div>
        {showSearcher && (
          <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 flex flex-col">
            <div className="p-2 pt-8 flex justify-between items-center w-full relative">
              <input
                value={search}
                onChange={handleValidateSearch}
                id="searcher"
                name="searcher"
                type="text"
                placeholder="Buscar..."
                className="bg-white rounded-full py-2 px-4 pl-12 w-[85vw] focus:outline-none focus:shadow-outline"
              />
              <RiCloseCircleFill
                onClick={() => setShowSearcher(!showSearcher)}
                className="text-3xl cursor-pointer text-white"
              />
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
            <div className="absolute top-20 left-0 w-full bg-white/50">
              {search.length >= 1 && (
                <DropdownList
                  options={formatedData}
                  onSelect={(value) => {
                    setShowSearcher(false);
                    navigate(`/inventario/ver/${value?.value}`);
                    setSearch("");
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searcher;
