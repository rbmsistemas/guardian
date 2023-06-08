import { Table } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const CustomeTable = ({
  data = [],
  showId = false,
  onShow = false,
  onEdit = false,
  onDelete = false,
}) => {
  return (
    <div className=" overflow-x-scroll ">
      <Table hoverable={true} className="w-full rounded-lg whitespace-nowrap ">
        <Table.Head className="capitalize">
          {data.length >= 1 &&
            Object.keys(data[0]).map((item) =>
              item === "id" && !showId ? null : (
                <Table.HeadCell key={item}>{item}</Table.HeadCell>
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
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {Object.keys(item).map((key) =>
                  key === "id" && !showId ? null : (
                    <Table.Cell key={key}>{item[key]}</Table.Cell>
                  )
                )}
                {onShow || onEdit || onDelete ? (
                  <Table.Cell className="flex gap-2 justify-center">
                    {onShow && (
                      <div
                        className="border border-gap-green text-gap-green p-2 rounded-lg hover:bg-gap-green hover:text-white transition ease-in-out duration-200 hover:scale-110"
                        onClick={() => onShow(item.id)}
                      >
                        <FaEye className="text-xl" />
                      </div>
                    )}
                    {onEdit && (
                      <div
                        className="border border-gap-primary text-gap-primary p-2 rounded-lg hover:bg-gap-primary hover:text-white transition ease-in-out duration-200 hover:scale-110"
                        onClick={() => onEdit(item.id)}
                      >
                        <FaRegEdit className="text-xl" />
                      </div>
                    )}
                    {onDelete && (
                      <div
                        className="border border-red-600 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition ease-in-out duration-200 hover:scale-110"
                        onClick={() => onDelete(item.id)}
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
  );
};

export default CustomeTable;

// {data.length >= 1 &&
//   data.map((item) => (
//     <Table.Row
//       key={item.id}
//       className="bg-white dark:border-gray-700 dark:bg-gray-800"
//     >
//       <Table.Cell className="w-auto">{item.id}</Table.Cell>
//       <Table.Cell>{item.type}</Table.Cell>
//       <Table.Cell>{item.brand}</Table.Cell>
//       <Table.Cell>{item.model}</Table.Cell>
//       <Table.Cell>{item.sn}</Table.Cell>
//       <Table.Cell>{item.active}</Table.Cell>
//       <Table.Cell>{item.date}</Table.Cell>
//       {isActions && (
//         <Table.Cell className="flex gap-2 justify-center">
//           <Link
//             className="border border-gap-green text-gap-green p-2 rounded-lg hover:bg-gap-green hover:text-white transition ease-in-out duration-200 hover:scale-110"
//             to={`/inventario/ver/${item.id}`}
//           >
//             <FaEye className="text-xl" />
//           </Link>
//           <Link
//             className="border border-gap-primary text-gap-primary p-2 rounded-lg hover:bg-gap-primary hover:text-white transition ease-in-out duration-200 hover:scale-110"
//             to={`/inventario/editar/${item.id}`}
//           >
//             <FaRegEdit className="text-xl" />
//           </Link>
//         </Table.Cell>
//       )}
//     </Table.Row>
//   ))}
