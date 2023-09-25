import { Table } from "flowbite-react";
import React, { useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaEye,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import { FormatedUrlImage } from "../../utils/FormatedUrlImage";
import ModalImageViewer from "../modals/ModalImageViewer";

const CustomeTable = ({
  data = [],
  showId = false,
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
}) => {
  const [itemSelected, setItemSelected] = useState({});
  const [modal, setModal] = useState(false);
  const [itemName, setItemName] = useState("");

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

  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable={true} className="w-full rounded-lg whitespace-nowrap">
          <Table.Head className="uppercase">
            {data.length >= 1 &&
              Object.keys(data[0]).map((item) =>
                item === "id" && !showId ? null : showImagen &&
                  item === "imagen" ? (
                  <Table.HeadCell key={item}>Imagen</Table.HeadCell>
                ) : (
                  <Table.HeadCell
                    className={`${
                      order.orderBy === data[0][item]?.key &&
                      "bg-gray-500 border-b-2 border-amber-400 text-amber-400 dark:text-gray-400"
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
                    <span className="flex gap-2 items-center ">
                      {item}
                      {order.sort === "ASC" &&
                        order.orderBy === data[0][item]?.key && <FaArrowDown />}
                      {order.sort === "DESC" &&
                        order.orderBy === data[0][item]?.key && <FaArrowUp />}
                    </span>
                  </Table.HeadCell>
                )
              )}
            {onShow || onEdit || onDelete ? (
              <Table.HeadCell className="text-center">Acciones</Table.HeadCell>
            ) : null}
          </Table.Head>
          <Table.Body className="divide-y">
            {data.length >= 1 &&
              data.map((item) => (
                <Table.Row
                  key={item.id.value}
                  onDoubleClick={() => onShow(item.id.value)}
                  onDrag={(e) => {
                    e.preventDefault();
                    onEdit(item.id.value);
                  }}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {Object.keys(item).map((key) =>
                    key === "id" && !showId ? null : showImagen &&
                      key === "imagen" ? (
                      <Table.Cell key={key}>
                        <img
                          src={FormatedUrlImage(item[key].value)}
                          alt={item[key].value}
                          className="w-10 h-10 object-cover rounded-lg cursor-pointer hover:scale-110 transition ease-in-out duration-200"
                          onClick={() => handleShowItem(item)}
                        />
                      </Table.Cell>
                    ) : key === "status" ? (
                      <Table.Cell key={key}>
                        <div
                          className={`text-center py-1 px-3 ${
                            item[key].value
                              ? "bg-green-300 text-green-700"
                              : "bg-red-300 text-red-700"
                          } rounded-lg `}
                        >
                          {item[key].value ? "Alta" : "Baja"}
                        </div>
                      </Table.Cell>
                    ) : (
                      <Table.Cell key={key}>{item[key].value}</Table.Cell>
                    )
                  )}
                  {onShow || onEdit || onDelete ? (
                    <Table.Cell className="flex gap-2 justify-center">
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
