import React from "react";
import {
  FaFile,
  FaFileAlt,
  FaFileCsv,
  FaFileExcel,
  FaFilePdf,
  FaFilePowerpoint,
  FaFilePrescription,
  FaFileWord,
} from "react-icons/fa";

export const handleIconFile = (type) => {
  if (type === "application/pdf") {
    return <FaFilePdf className="text-4xl text-red-500" />;
  } else if (
    type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return <FaFileWord className="text-4xl text-blue-500" />;
  } else if (
    type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return <FaFileExcel className="text-4xl text-green-500" />;
  } else if (type === "application/msword") {
    return <FaFileWord className="text-4xl text-blue-500" />;
  } else if (type === "text/plain") {
    return <FaFileAlt className="text-4xl text-gray-500" />;
  } else if (type === "text/csv") {
    return <FaFileCsv className="text-4xl text-green-500" />;
  } else if (type === "application/vnd.ms-powerpoint") {
    return <FaFilePrescription className="text-4xl text-red-500" />;
  } else if (
    type ===
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return <FaFilePowerpoint className="text-4xl text-red-500" />;
  } else {
    // Si no se encuentra ninguna coincidencia, devolver un ícono predeterminado
    return <FaFile className="text-4xl text-gray-500" />;
  }
};
