import { Modal } from "flowbite-react";
import React, { useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdCameraswitch } from "react-icons/md";
import Webcam from "react-webcam";

const CameraComponent = ({ capturedImage = [], setCapturedImage }) => {
  const webcamRef = useRef(null);
  const [currentFacingMode, setCurrentFacingMode] = useState("environment");

  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const isCordova = typeof window.cordova !== "undefined";

  const videoConstraints = {
    facingMode: currentFacingMode,
  };

  const captureImage = async () => {
    try {
      if (isCordova) {
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          correctOrientation: true,
        });

        function onSuccess(imageData) {
          const image = document.getElementById("image");
          image.src = imageData;
          setCapturedImage([...capturedImage, imageData]);
        }

        function onFail(message) {
          alert("Failed because: " + message);
        }
      } else {
        const imageSrc = webcamRef.current.getScreenshot({
          width: 1920,
          height: 1080,
        });

        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const file = new File([blob], "captured_image.jpeg", {
          type: "image/jpeg",
        });

        setCapturedImage([...capturedImage, file]);
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const switchCamera = () => {
    setCurrentFacingMode((prevMode) =>
      prevMode === "user" ? "environment" : "user"
    );
  };

  const removeCapturedImage = (index) => {
    const newCapturedImage = capturedImage.filter((item, i) => i !== index);
    setCapturedImage(newCapturedImage);
  };

  const selectImage = (index) => {
    setImage(capturedImage[index]);
    setShowModal(true);
  };

  const onClose = () => setShowModal(false);

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative flex flex-col gap-4">
        <p
          className="text-2xl text-white absolute top-5 right-5 bg-white/20 p-2 rounded-full"
          onClick={switchCamera}
        >
          <MdCameraswitch color="#ffffff" />
        </p>
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints={videoConstraints}
          mirrored={currentFacingMode === "user"}
          screenshotFormat="image/jpeg"
          height={720}
          width={1280}
          className="rounded-lg bg-gray-300 md:max-h-96"
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

      <div className="w-full h-full max-h-full grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 mt-2">
        <div className="w-32 h-32 border-2 border-dashed border-gray-500 text-gray-500 rounded-lg transition ease-in-out duration-200 hover:scale-105 hover:bg-slate-100">
          <label
            htmlFor="upload"
            className="w-32 h-32 flex flex-col justify-center items-center gap-2 cursor-pointer"
          >
            <span className="text-3xl">
              <AiOutlineCamera />
            </span>
            <span className="text-center text-sm font-semibold">
              Subir imagen
            </span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple={false}
            accept={
              ".png, .jpg, .jpeg, .webp, avif, .gif, .jfif, .svg, .bmp, .tiff"
            }
            onChange={(e) =>
              setCapturedImage([...capturedImage, e.target.files[0]])
            }
            // onChange={(e) => {
            //   const file = e.target.files[0];
            //   const reader = new FileReader();
            //   reader.readAsDataURL(file);
            //   reader.onloadend = () => {
            //     setCapturedImage([...capturedImage, reader.result]);
            //   };
            // }}
          />
        </div>
        {capturedImage.length > 0 &&
          capturedImage.map((item, index) => {
            return (
              <div
                key={index}
                className="w-32 h-32 border-2 border-dashed border-gray-500 rounded-lg relative transition ease-in-out duration-200 hover:scale-105"
              >
                <span
                  onClick={() => removeCapturedImage(index)}
                  className="absolute top-3 right-3 bg-red-500 rounded-full text-white hover:bg-red-600 hover:text-white text-xl cursor-pointer p-2 transition ease-in-out hover:scale-110 duration-150"
                >
                  <FaRegTrashAlt />
                </span>
                {item instanceof File ? (
                  <img
                    className="object-fill p-1 h-32 w-32 rounded-lg cursor-pointer"
                    onClick={() => selectImage(index)}
                    src={URL.createObjectURL(item)}
                    alt="image-captured"
                  />
                ) : (
                  <img
                    className="object-fill p-1 h-32 w-32 rounded-lg cursor-pointer"
                    onClick={() => selectImage(index)}
                    src={item}
                    alt="image-captured"
                  />
                )}
              </div>
            );
          })}
      </div>
      <Modal dismissible={true} show={showModal} onClose={onClose} size="3xl">
        <Modal.Header>Imagenes</Modal.Header>
        <Modal.Body>
          {image && (
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image}
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
