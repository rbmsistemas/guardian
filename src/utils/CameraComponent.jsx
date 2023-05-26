import { Button, Modal } from "flowbite-react";
import React, { useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import Webcam from "react-webcam";

const CameraComponent = ({ capturedImage = [], setCapturedImage }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1920,
      height: 1080,
    });
    setCapturedImage([...capturedImage, imageSrc]);
  };

  const removeCapturedImage = (index) => {
    const newCapturedImage = capturedImage.filter((item, i) => i !== index);
    setCapturedImage(newCapturedImage);
  };

  const onClick = () => setShowModal(true);
  const onClose = () => setShowModal(false);

  const selectImage = (index) => {
    setImage(capturedImage[index]);
    setShowModal(true);
  };
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          height={720}
          width={1280}
          className="rounded-lg bg-gray-300"
        />
        <button
          type="button"
          className="bg-blue-500 border-2 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md flex items-center gap-2 justify-center transition ease-in-out duration-200 hover:scale-105"
          onClick={captureImage}
        >
          <span>
            <AiOutlineCamera className="text-2xl" />
          </span>
          Capturar imagen
        </button>
      </div>

      {capturedImage.length > 0 && (
        <div className="w-full grid grid-cols-2 gap-2 mt-2">
          {capturedImage.map((item, index) => {
            return (
              <div key={index} className="w-full relative">
                <span
                  onClick={() => removeCapturedImage(index)}
                  className="absolute top-3 right-3 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white text-xl cursor-pointer p-2 transition ease-in-out hover:scale-110 delay-75"
                >
                  <FaRegTrashAlt />
                </span>
                <img
                  className="w-full rounded-lg cursor-pointer"
                  onClick={() => selectImage(index)}
                  src={item}
                  alt="image-captured"
                />
              </div>
            );
          })}
        </div>
      )}
      <Modal show={showModal} dismissible onClose={onClose} size="3xl">
        <Modal.Header>Imagenes</Modal.Header>
        <Modal.Body>
          {image && (
            <img
              src={image}
              alt="imagen-selected"
              className="w-full rounded-lg "
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CameraComponent;
