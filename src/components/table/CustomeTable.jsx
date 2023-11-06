import { Table, TextInput } from "flowbite-react";
import React, { useState } from "react";
import {
  FaCheckSquare,
  FaEye,
  FaRegEdit,
  FaRegSquare,
  FaRegTrashAlt,
  FaShare,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
} from "react-icons/fa";
import { FormatedUrlImage } from "../../utils/FormatedUrlImage";
import ModalImageViewer from "../modals/ModalImageViewer";
import { MdPlaylistRemove } from "react-icons/md";
import getFormatedStatus from "../../utils/getFormatedStatus";

const CustomeTable = ({
  data = [],
  showId = false,
  onShare = false,
  onShow = false,
  onEdit = false,
  onDelete = false,
  showImagen = false,
  quantityResults = 5,
  setQuantityResults,
  page = 1,
  setPage,
  totalEntries = 0,
  totalPages = 0,
  sortByHeader,
  onSortFilters = () => {},
  order = { orderBy: "", sort: "" },
  exportResults,
  resultsToExport = [],
  setResultsToExport = () => {},
}) => {
  const [itemSelected, setItemSelected] = useState({});
  const [modal, setModal] = useState(false);
  const [itemName, setItemName] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const handleShowItem = (item) => {
    setItemSelected(item);
    let name = item?.imagen?.name || item?.imagen?.value || "";
    setItemName(name ?? "");
    setModal(true);
  };

  const handleSortByHeader = (header) => {
    if (sortByHeader) {
      onSortFilters(header);
    }
  };

  const handleSelectElement = (item) => {
    let newSelectedElements = [...resultsToExport];
    if (newSelectedElements.includes(item)) {
      newSelectedElements = newSelectedElements.filter(
        (element) => element !== item
      );
    } else {
      newSelectedElements.push(item);
    }
    setResultsToExport(newSelectedElements);
  };

  const handleHeaderCheckboxChange = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setResultsToExport(data.map((item) => item.id.value));
    } else {
      setResultsToExport([]);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable={true} className="w-full rounded-lg whitespace-nowrap">
          <Table.Head className="uppercase">
            {exportResults && (
              <Table.HeadCell
                style={{ paddingTop: "10px", paddingBottom: "10px" }}
                className="bg-neutral-200 border-r border-white"
              >
                <div
                  className={`cursor-pointer border-2 border-gray-300 rounded-lg w-8 h-8 p-1 ${
                    resultsToExport.length === data.length
                      ? "text-purple-500 border-purple-500"
                      : "text-gray-500"
                  }hover:scale-110 transition ease-in-out duration-200 flex items-center justify-center `}
                  onClick={handleHeaderCheckboxChange}
                >
                  {resultsToExport.length === data.length ? (
                    <FaCheckSquare className="text-xl" />
                  ) : (
                    <FaRegSquare className="text-xl" />
                  )}
                </div>
              </Table.HeadCell>
            )}
            {data.length >= 1 &&
              Object.keys(data[0]).map((item) =>
                item === "id" && !showId ? null : showImagen &&
                  item === "imagen" ? (
                  <Table.HeadCell
                    style={{ paddingTop: "10px", paddingBottom: "10px" }}
                    className="bg-neutral-200"
                    key={item}
                  >
                    Imagen
                  </Table.HeadCell>
                ) : (
                  <Table.HeadCell
                    style={{ paddingTop: "10px", paddingBottom: "10px" }}
                    className={`relative bg-neutral-200 border-r border-white ${
                      order.orderBy === data[0][item]?.key &&
                      "bg-purple-500 border-b-2 text-white dark:text-gray-400"
                    } ${sortByHeader ? "cursor-pointer" : "cursor-default"} ${
                      sortByHeader &&
                      onSortFilters &&
                      order.orderBy !== data[0][item]?.key
                        ? "hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
                        : ""
                    } transition ease-in-out duration-200`}
                    onClick={() => handleSortByHeader(data[0][item]?.key ?? "")}
                    key={item}
                  >
                    <span className="relative flex gap-2 items-center justify-between">
                      <span className="flex gap-2 items-center justify-start">
                        {item}
                        {order.sort === "ASC" &&
                          order.orderBy === data[0][item]?.key && (
                            <FaSortAlphaDown />
                          )}
                        {order.sort === "DESC" &&
                          order.orderBy === data[0][item]?.key && (
                            <FaSortAlphaDownAlt />
                          )}
                      </span>
                      <span className="text-transparent">____</span>
                      {order.orderBy === data[0][item]?.key && (
                        <MdPlaylistRemove
                          onClick={() => onSortFilters("")}
                          size={20}
                          className="text-white hover:text-red-300 rounded-full transition ease-in-out duration-100 absolute right-0 cursor-pointer top-1/2 transform -translate-y-1/2"
                        />
                      )}
                    </span>
                  </Table.HeadCell>
                )
              )}
            {onShow || onEdit || onDelete ? (
              <Table.HeadCell
                style={{ paddingTop: "10px", paddingBottom: "10px" }}
                className="text-center bg-neutral-200"
              >
                Acciones
              </Table.HeadCell>
            ) : null}
          </Table.Head>
          <Table.Body className="divide-y">
            {data.length >= 1 &&
              data.map((item) => (
                <Table.Row
                  key={item.id.value}
                  onDoubleClick={() => onShow(item.id.value)}
                  // onContextMenu={(e) => {
                  //   e.preventDefault();
                  //   setContextMenuVisible(true);
                  //   setContextMenuPosition({ top: e.clientY, left: e.clientX });
                  //   DisplayAux({
                  //     item,
                  //     onShow,
                  //     onEdit,
                  //     onDelete,
                  //     visible: contextMenuVisible,
                  //   });
                  // }}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 relative"
                >
                  {exportResults && (
                    <Table.Cell
                      style={{ paddingTop: "10px", paddingBottom: "10px" }}
                    >
                      <div
                        className={`cursor-pointer border-gray-300 rounded-lg w-8 h-8 p-1 ${
                          resultsToExport.includes(item.id.value)
                            ? "text-purple-500 border-purple-500 border-2"
                            : "text-gray-500 border"
                        } hover:scale-110 transition ease-in-out duration-200 flex items-center justify-center `}
                        onClick={() => handleSelectElement(item.id.value)}
                      >
                        {resultsToExport.includes(item.id.value) ? (
                          <FaCheckSquare className="text-xl" />
                        ) : (
                          <FaRegSquare className="text-xl" />
                        )}
                      </div>
                    </Table.Cell>
                  )}
                  {Object.keys(item).map((key) =>
                    key === "id" && !showId ? null : showImagen &&
                      key === "imagen" ? (
                      <Table.Cell
                        style={{ paddingTop: "10px", paddingBottom: "10px" }}
                        key={key}
                      >
                        <img
                          src={FormatedUrlImage(item[key].value)}
                          alt={item[key].value}
                          className="w-10 h-10 object-cover rounded-lg cursor-pointer hover:scale-110 transition ease-in-out duration-200"
                          onClick={() => handleShowItem(item)}
                        />
                      </Table.Cell>
                    ) : key === "status" ? (
                      <Table.Cell
                        style={{ paddingTop: "10px", paddingBottom: "10px" }}
                        key={key}
                      >
                        <div
                          className={`text-center font-semibold py-1 px-3 ${
                            item[key]?.value == 1
                              ? "bg-green-200 text-green-500"
                              : item[key]?.value == 2
                              ? "bg-amber-200 text-amber-500"
                              : item[key]?.value == 3
                              ? "bg-red-200 text-red-500"
                              : null
                          } rounded-lg `}
                        >
                          {getFormatedStatus(item[key]?.value)}
                        </div>
                      </Table.Cell>
                    ) : (
                      <Table.Cell
                        style={{ paddingTop: "10px", paddingBottom: "10px" }}
                        key={key}
                      >
                        {item[key].value}
                      </Table.Cell>
                    )
                  )}
                  {onShow || onEdit || onDelete ? (
                    <Table.Cell
                      style={{ paddingTop: "10px", paddingBottom: "10px" }}
                      className="flex gap-2 justify-center"
                    >
                      {onShare && (
                        <div
                          className="cursor-pointer border border-gap-orange text-gap-orange p-2 rounded-lg hover:bg-gap-orange hover:text-white transition ease-in-out duration-200 hover:scale-110"
                          onClick={() => onShare(item.id.value)}
                        >
                          <FaShare className="text-xl" />
                        </div>
                      )}
                      {onShow && (
                        <div
                          className="cursor-pointer border border-gap-green text-gap-green p-2 rounded-lg hover:bg-gap-green hover:text-white transition ease-in-out duration-200 hover:scale-110"
                          onClick={() => onShow(item.id.value)}
                        >
                          <FaEye className="text-xl" />
                        </div>
                      )}
                      {onEdit && (
                        <div
                          className="cursor-pointer border border-gap-primary text-gap-primary p-2 rounded-lg hover:bg-gap-primary hover:text-white transition ease-in-out duration-200 hover:scale-110"
                          onClick={() => onEdit(item.id.value)}
                        >
                          <FaRegEdit className="text-xl" />
                        </div>
                      )}
                      {onDelete &&
                        item?.id !== "00000000-0000-0000-0000-000000000000" && (
                          <div
                            className="cursor-pointer border border-red-600 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition ease-in-out duration-200 hover:scale-110"
                            onClick={() => onDelete(item.id.value)}
                          >
                            <FaRegTrashAlt className="text-xl" />
                          </div>
                        )}
                    </Table.Cell>
                  ) : null}
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex justify-end items-center mt-5 text-xs md:text-base">
        <div className="flex gap-2 items-center flex-wrap justify-end">
          <p className="text-gray-500">
            Mostrando {data.length} de {totalEntries} resultados
          </p>
          <select
            className="border border-gray-300 rounded-lg p-2 text-sm md:text-base"
            value={quantityResults}
            onChange={(e) => setQuantityResults(e.target.value)}
          >
            <option value={5}>5 resultados</option>
            <option value={10}>10 resultados</option>
            <option value={20}>20 resultados</option>
            <option value={30}>30 resultados</option>
            <option value={40}>40 resultados</option>
            <option value={50}>50 resultados</option>
            <option value={totalEntries}>Todos los resultados</option>
          </select>
          <p className="text-gray-500">
            en la página {page} de {totalPages} páginas
          </p>
          <div className="flex gap-3">
            <button
              className={`border border-gray-300 rounded-lg p-2 ${
                page == 1
                  ? ""
                  : "cursor-pointer hover:bg-gap-orange hover:text-white transition ease-in-out duration-200 hover:scale-110 active:bg-gray-500 active:text-white "
              }`}
              onClick={() => setPage(parseInt(page) - 1)}
              disabled={page == 1}
            >
              Anterior
            </button>
            <button
              className={`border border-gray-300 rounded-lg p-2 ${
                page == totalPages || totalEntries == 0 || data.length == 0
                  ? " "
                  : "cursor-pointer hover:bg-gap-orange hover:text-white transition ease-in-out duration-200 hover:scale-110 active:bg-gray-500 active:text-white "
              }`}
              onClick={() => setPage(parseInt(page) + 1)}
              disabled={
                page == totalPages || totalEntries == 0 || data.length == 0
              }
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <ModalImageViewer
          images={[itemSelected?.imagen?.value] || []}
          title={itemName}
          show={modal}
          onClose={() => setModal(false)}
          isDownloadImage={true}
        />
      )}
    </>
  );
};

export default CustomeTable;

// const DisplayAux = ({ item, onShow, onEdit, onDelete, visible }) => {
//   return (
//     visible && (
//       <div
//         className={` absolute z-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-1 px-2`}
//       >
//         {onShow && (
//           <div
//             className="cursor-pointer border border-gap-green text-gap-green p-2 rounded-lg hover:bg-gap-green hover:text-white transition ease-in-out duration-200 hover:scale-110"
//             onClick={() => onShow(item.id.value)}
//           >
//             <FaEye className="text-xl" />
//           </div>
//         )}
//         {onEdit && (
//           <div
//             className="cursor-pointer border border-gap-primary text-gap-primary p-2 rounded-lg hover:bg-gap-primary hover:text-white transition ease-in-out duration-200 hover:scale-110"
//             onClick={() => onEdit(item.id.value)}
//           >
//             <FaRegEdit className="text-xl" />
//           </div>
//         )}
//         {onDelete && item?.id !== "00000000-0000-0000-0000-000000000000" && (
//           <div
//             className="cursor-pointer border border-red-600 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition ease-in-out duration-200 hover:scale-110"
//             onClick={() => onDelete(item.id.value)}
//           >
//             <FaRegTrashAlt className="text-xl" />
//           </div>
//         )}
//       </div>
//     )
//   );
// };
