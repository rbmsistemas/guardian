import React, { useState, lazy } from "react";
import { FaFileExcel } from "react-icons/fa";
import Loading from "../utils/Loading";
import ExcelJS from "exceljs/dist/exceljs.min.js";

const exportTableToExcel = async (headers, data, filename, setLoading) => {
  setLoading(true);
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Registros");

  worksheet.addRow(headers);

  for (const row of data) {
    const rowData = [];
    for (const column of headers) {
      if (column === "Imagen") {
        try {
          const imageBlob = await fetch(row[column]).then((response) =>
            response.blob()
          );

          if (!imageBlob || imageBlob.type == "text/html") {
            rowData.push("");
            continue;
          }

          const compressedImageBase64 = await compressImage(
            imageBlob,
            500,
            700
          );

          const imageId = workbook.addImage({
            base64: compressedImageBase64,
            extension: "png",
          });

          worksheet.addImage(imageId, {
            tl: { col: headers.indexOf(column), row: worksheet.lastRow.number },
            ext: { width: 100, height: 100 },
          });

          rowData.push("");
        } catch (error) {
          console.log(`Error fetching image: ${error}`);
          rowData.push("");
          setLoading(false);
        }
      } else {
        rowData.push(row[column]);
      }
    }
    worksheet.addRow(rowData);
  }

  const blob = await workbook.xlsx.writeBuffer();

  const blobObject = new Blob([blob], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blobObject);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setLoading(false);
};

const compressImage = async (imageBlob, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let newWidth = img.width;
      let newHeight = img.height;

      if (img.width > maxWidth) {
        newWidth = maxWidth;
        newHeight = (maxWidth / img.width) * img.height;
      }

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (maxHeight / img.height) * img.width;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result.split(",")[1]);
        };
      }, "image/png");
    };
    img.src = URL.createObjectURL(imageBlob);
  });
};

const ExportExcel = ({ headers, data, filename, disabled, title }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <button
        disabled={disabled}
        className={`flex gap-2 justify-center ${
          disabled
            ? "bg-none text-gray-500 cursor-not-allowed border-2 border-gray-300"
            : "cursor-pointer bg-green-500 hover:bg-green-600 text-white border-2 border-green-500 hover:border-green-600"
        } font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline`}
        onClick={() => exportTableToExcel(headers, data, filename, setLoading)}
      >
        <FaFileExcel className="inline-block mr-2" />
        <span className="hidden md:block text-sm truncate">
          {title || "Exportar"}
        </span>
      </button>
      {loading && <Loading />}
    </>
  );
};

export default ExportExcel;
