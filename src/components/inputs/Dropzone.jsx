import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
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

const DropzoneComponent = ({ onFilesDrop }) => {
  const [archivos, setArchivos] = useState([]);
  const [contador, setContador] = useState(0);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const nuevosArchivos = acceptedFiles.map((file) => ({
        file,
        id: contador + 1,
      }));
      setArchivos((prevArchivos) => [...prevArchivos, ...nuevosArchivos]);
      setContador(contador + 1);
      onFilesDrop([...archivos, ...nuevosArchivos]);
    },
    [onFilesDrop, archivos, contador]
  );

  const handleRemoveFile = (id) => {
    const nuevosArchivos = archivos.filter((file) => file.id !== id);
    setArchivos(nuevosArchivos);
    onFilesDrop(nuevosArchivos.map((file) => file.file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept:
      ".pdf, .txt, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta los archivos aquí...</p>
        ) : (
          <p>
            Arrastra y suelta archivos aquí o haz clic para seleccionar archivos
          </p>
        )}
      </div>

      <div className="pt-4">
        <h2>Archivos Seleccionados:</h2>
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-4 relative pt-4">
          {archivos.map(({ file, id }, i) => (
            <li
              key={i}
              className="relative flex flex-col w-full min-h-[20vh] gap-2 items-center justify-center rounded-md hover:bg-gray-50 transition-all ease-in-out duration-200 shadow-md p-4"
            >
              <span>{handleIconFile(file)}</span>
              <span>
                {file.name?.substring(0, 20)?.trim()}
                {file?.name?.length > 20 && "..."}
              </span>
              <button
                className="py-1 px-2 rounded-full hover:bg-red-500 hover:text-white absolute top-2 right-2"
                onClick={() => handleRemoveFile(id)}
              >
                &#x2715;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default DropzoneComponent;

const handleIconFile = (file) => {
  if (file.type === "application/pdf") {
    return <FaFilePdf className="text-4xl text-red-500" />;
  } else if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return <FaFileWord className="text-4xl text-blue-500" />;
  } else if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return <FaFileExcel className="text-4xl text-green-500" />;
  } else if (file.type === "application/msword") {
    return <FaFileWord className="text-4xl text-blue-500" />;
  } else if (file.type === "text/plain") {
    return <FaFileAlt className="text-4xl text-gray-500" />;
  } else if (file.type === "text/csv") {
    return <FaFileCsv className="text-4xl text-green-500" />;
  } else if (file.type === "application/vnd.ms-powerpoint") {
    return <FaFilePrescription className="text-4xl text-red-500" />;
  } else if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return <FaFilePowerpoint className="text-4xl text-red-500" />;
  } else {
    // Si no se encuentra ninguna coincidencia, devolver un ícono predeterminado
    return <FaFile className="text-4xl text-gray-500" />;
  }
};
