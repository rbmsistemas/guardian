import { FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";

const exportTableToExcel = (headers, data, filename) => {
  const tableData = [];
  const rows = headers;
  tableData.push(rows);

  data.forEach((row) => {
    const rowData = [];
    headers.forEach((column) => {
      rowData.push(row[column]);
    });
    tableData.push(rowData);
  });

  try {
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registros");
    XLSX.writeFile(wb, filename);
  } catch (error) {
    console.log(error);
  }
};

const ExportExcel = ({ headers, data, filename }) => {
  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center"
      onClick={() => exportTableToExcel(headers, data, filename)}
    >
      <FaFileExcel className="inline-block mr-2" />
      Exportar
    </button>
  );
};

export default ExportExcel;
