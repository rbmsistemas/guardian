import React from "react";
import { FaFileExcel } from "react-icons/fa";
import ExcelJS from "exceljs";
import imageSize from "image-size"; // Importa la biblioteca de compresión de imágenes

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
        const imageBase64 = await getCompressedBase64FromUrl(row[column]); // Función para obtener el base64 de la imagen comprimida desde la URL
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

const getCompressedBase64FromUrl = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();

  // Obtiene las dimensiones originales de la imagen
  const dimensions = imageSize(Buffer.from(await blob.arrayBuffer()));

  // Calcula la calidad de compresión deseada (puedes ajustar este valor según tus necesidades)
  const quality = 0.7; // Por ejemplo, usa 0.7 para una calidad del 70%

  // Convierte la imagen a base64 con la calidad especificada
  const compressedBase64 = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
      canvas.toBlob(
        (compressedBlob) => {
          reader.readAsDataURL(compressedBlob);
        },
        "image/jpeg", // Cambia esto según el formato de tus imágenes
        quality // Ajusta la calidad de compresión aquí
      );
    };
  });

  return compressedBase64.split(",")[1];
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
