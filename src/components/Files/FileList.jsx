import React, { useState } from "react";
import { handleIconFile } from "../../utils/HandleIconFile";
import {
  RiEdit2Line,
  RiDownload2Line,
  RiDeleteBinLine,
  RiEye2Fill,
} from "react-icons/ri";
import { Modal } from "flowbite-react";

const FileList = ({
  files = [{ file: "", title: "", description: "", extension: "" }],
  onEdit = null,
  onDownload = null,
  onDelete = null,
  isShow = false,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  console.log(files);
  return files?.map((file, index) => (
    <div
      key={index}
      className={` bg-gray-50 hover:bg-gray-100 relative w-full flex justify-between items-center gap-2 p-2 rounded-md shadow-md transition-all ease-in-out duration-200 hover:scale-105`}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex gap-2 items-center ${
          hoveredIndex === index ? "blur-sm" : ""
        }`}
      >
        <span>{handleIconFile(file?.file?.type)}</span>
        <span className="text-sm font-semibold">
          {file?.title?.substring(0, 25)?.trim()}
          {file?.title?.length > 25 && "..."}
        </span>
      </div>
      {hoveredIndex === index && (
        <div className="flex gap-4 items-center justify-end absolute top-1/2 right-1/2 transform -translate-y-1/2 translate-x-1/2 transition-all ease-in-out duration-200">
          {onDelete && (
            <button
              type="button"
              className="p-3 ring-2 ring-white transform hover:scale-110 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all ease-in-out duration-200"
              onClick={() => onDelete(file)}
            >
              <RiDeleteBinLine />
            </button>
          )}
          {onEdit && (
            <button
              type="button"
              className="p-3 ring-2 ring-white transform hover:scale-110 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all ease-in-out duration-200"
              onClick={() => onEdit(file)}
            >
              <RiEdit2Line />
            </button>
          )}
          {onDownload && (
            <button
              type="button"
              className="p-3 ring-2 ring-white transform hover:scale-110 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all ease-in-out duration-200"
              onClick={() => onDownload(file)}
            >
              <RiDownload2Line />
            </button>
          )}
          {isShow && (
            <button
              type="button"
              className="p-3 ring-2 ring-white transform hover:scale-110 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-all ease-in-out duration-200"
              onClick={() => {
                setSelectedFile(file);
                setShowModal(true);
              }}
            >
              <RiEye2Fill />
            </button>
          )}
        </div>
      )}
      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          title="Vista previa"
          size="xl"
          dismissible
        >
          <Modal.Header>
            <span className="text-xl font-semibold">Resumen del archivo</span>
          </Modal.Header>
          <Modal.Body>
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-start w-full gap-2 items-start rounded-md transition-all ease-in-out duration-200 p-4">
                <span className="flex flex-col justify-center items-center gap-2 w-full">
                  {handleIconFile(selectedFile?.file?.type)}
                  <span className="font-semibold text-lg">
                    {selectedFile?.title}
                  </span>
                </span>
                <div
                  className="text-gray-800 min-h-[7vh] list-disc w-full"
                  dangerouslySetInnerHTML={{ __html: selectedFile.description }}
                ></div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  ));
};

export default FileList;
