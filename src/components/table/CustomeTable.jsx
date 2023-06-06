import { Table } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaRegEdit } from "react-icons/fa";

const CustomeTable = ({ data = [], isActions = false }) => {
  return (
    <div className=" overflow-x-scroll ">
      <Table hoverable={true} className="w-full rounded-lg whitespace-nowrap ">
        <Table.Head className="capitalize">
          {data.length >= 1 &&
            Object.keys(data[0]).map((item) => (
              <Table.HeadCell key={item}>{item}</Table.HeadCell>
            ))}
          {isActions && (
            <Table.HeadCell className="text-center">Acciones</Table.HeadCell>
          )}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.length >= 1 &&
            data.map((item) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {Object.keys(item).map((key) => (
                  <Table.Cell key={key}>{item[key]}</Table.Cell>
                ))}
                {isActions && (
                  <Table.Cell className="flex gap-2 justify-center">
                    <Link
                      className="border border-gap-green text-gap-green p-2 rounded-lg hover:bg-gap-green hover:text-white transition ease-in-out duration-200 hover:scale-110"
                      to={`/inventario/ver/${item.id}`}
                    >
                      <FaEye className="text-xl" />
                    </Link>
                    <Link
                      className="border border-gap-primary text-gap-primary p-2 rounded-lg hover:bg-gap-primary hover:text-white transition ease-in-out duration-200 hover:scale-110"
                      to={`/inventario/editar/${item.id}`}
                    >
                      <FaRegEdit className="text-xl" />
                    </Link>
                  </Table.Cell>
                )}
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