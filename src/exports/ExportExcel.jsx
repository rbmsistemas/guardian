import * as XLSX from "xlsx";

const exportTableToExcel = (table, filename) => {
  const tableData = [];
  const rows = table.querySelectorAll("tr");

  for (const row of rows) {
    const rowData = [];
    const cells = row.querySelectorAll("th,td");

    for (const cell of cells) {
      rowData.push(cell.innerText);
    }

    tableData.push(rowData);
  }

  try {
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registros");
    XLSX.writeFile(wb, filename);
  } catch (error) {
    console.log(error);
  }
};

const ExportExcel = ({ tableRef, filename }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => exportTableToExcel(tableRef.current, filename)}
    >
      Exportar
    </button>
  );
};

export default ExportExcel;
