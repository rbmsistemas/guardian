// import { FaFileExcel } from "react-icons/fa";
// import * as XLSX from "xlsx";

// const exportTableToExcel = (headers, data, filename) => {
//   const tableData = [];
//   const rows = headers;
//   tableData.push(rows);

//   data.forEach((row) => {
//     const rowData = [];
//     headers.forEach((column) => {
//       // Si la columna es la columna de la imagen, asegúrate de que contenga el enlace a la imagen.
//       if (column === "Imagen") {
//         // Agrega el enlace a la celda de la hoja de cálculo.
//         rowData.push({ t: "s", v: row[column], l: { Target: row[column] } });
//       } else {
//         // Para otras columnas, simplemente agrega el valor.
//         rowData.push(row[column]);
//       }
//     });
//     tableData.push(rowData);
//   });

//   try {
//     const ws = XLSX.utils.aoa_to_sheet(tableData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Registros");
//     XLSX.writeFile(wb, filename);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const ExportExcel = ({ headers, data, filename }) => {
//   return (
//     <button
//       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center"
//       onClick={() => exportTableToExcel(headers, data, filename)}
//     >
//       <FaFileExcel className="inline-block mr-2" />
//       Exportar
//     </button>
//   );
// };

// export default ExportExcel;

import React from "react";
import { FaFileExcel } from "react-icons/fa";
import ExcelJS from "exceljs";

const exportTableToExcel = async (headers, data, filename) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Registros");

  // Agrega las cabeceras
  worksheet.addRow(headers);

  // Agrega los datos
  for (const row of data) {
    const rowData = [];
    for (const column of headers) {
      if (column === "Imagen") {
        // Agrega una imagen usando addImage
        const imageBase64 = await getBase64FromUrl(row[column]); // Función para obtener el base64 de la imagen desde la URL
        const imageId = workbook.addImage({
          base64: imageBase64,
          extension: "png", // Cambia esto según el formato de tus imágenes
        });

        worksheet.addImage(imageId, {
          tl: { col: headers.indexOf(column), row: worksheet.lastRow.number },
          ext: { width: 100, height: 100 }, // Ajusta el tamaño de la imagen según tus necesidades
        });

        rowData.push(""); // Puedes dejar la celda de la imagen vacía
      } else {
        rowData.push(row[column]);
      }
    }
    worksheet.addRow(rowData);
  }

  // Crea un Blob a partir del libro de trabajo
  const blob = await workbook.xlsx.writeBuffer();

  // Crea un objeto Blob y genera una URL para descargar el archivo
  const blobObject = new Blob([blob], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blobObject);

  // Crea un enlace y simula un clic para descargar el archivo
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
};

const getBase64FromUrl = async (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve(reader.result.split(",")[1]);
          };
        },
        "image/png" // Cambia esto según el formato de tus imágenes
      );
    };
    img.src = url;
  });
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
