import { Modal } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdCameraswitch, MdFlashOff, MdFlashOn } from "react-icons/md";
import Webcam from "react-webcam";
import { FormatedUrlImage } from "./FormatedUrlImage";
import ModalImageViewer from "../components/modals/ModalImageViewer";

const CameraComponent = ({ capturedImage = [], setCapturedImage }) => {
  const webcamRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const [currentFacingMode, setCurrentFacingMode] = useState("environment");

  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFlash, setisFlash] = useState(false);
  const isCordova = typeof window.cordova !== "undefined";

  const notifyError = (error) => toast.error(error);

  const videoConstraints = {
    facingMode: currentFacingMode,
  };

  useEffect(() => {
    const comprobarFlash = async () => {
      const track = mediaStreamRef.current?.getVideoTracks()[0];
      if (track) {
        try {
          await track.applyConstraints({
            advanced: [{ torch: !track.getSettings().torch }],
          });
          setisFlash(track.getSettings().torch);
        } catch (error) {
          console.error("Flash control not supported:", error);
        }
      }
    };
    comprobarFlash();
  }, []);

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
        const imageSrc = webcamRef.current.getScreenshot();

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
    setImage(index);
    setShowModal(true);
  };

  const onClose = () => setShowModal(false);

  const toggleFlash = async () => {
    const track = mediaStreamRef?.current?.getVideoTracks()[0];
    if (track) {
      try {
        await track.applyConstraints({
          advanced: [{ torch: !track.getSettings().torch }],
        });
        setisFlash(!isFlash);
      } catch (error) {
        notifyError("El dispositivo no soporta flash");
        console.error("Flash control not supported:", error);
      }
    } else {
      notifyError("El dispositivo no soporta flash");
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative flex flex-col gap-4">
        <p
          className="text-2xl text-white absolute top-5 right-5 bg-black/20 p-2 rounded-full cursor-pointer z-10"
          onClick={switchCamera}
        >
          <MdCameraswitch color="#ffffff" />
        </p>
        <p
          className="text-2xl text-white absolute top-5 left-5 bg-black/20 p-2 rounded-full cursor-pointer z-10"
          onClick={toggleFlash}
        >
          {isFlash ? (
            <MdFlashOn color="#ff0" />
          ) : (
            <MdFlashOff color="#ffffff" />
          )}
        </p>
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints={videoConstraints}
          onUserMedia={(stream) => {
            mediaStreamRef.current = stream;
          }}
          mirrored={currentFacingMode === "user"}
          screenshotFormat="image/jpeg"
          height={1080}
          width={1920}
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
      <div className="w-full h-full max-h-full flex flex-wrap gap-2 mt-2 md:mt-0">
        <div className="w-28 h-28 max-w-[7rem] flex-grow border border-dashed border-gray-500 text-gray-500 rounded-lg transition ease-in-out duration-200 hover:scale-105 hover:bg-slate-100">
          <label
            htmlFor="upload"
            className="w-full h-full flex flex-col justify-center items-center gap-2 cursor-pointer"
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
            multiple={true}
            accept={
              ".png, .jpg, .jpeg, .webp, avif, .gif, .jfif, .svg, .bmp, .tiff"
            }
            onChange={(e) =>
              setCapturedImage([...capturedImage, ...e.target.files])
            }
          />
        </div>
        {capturedImage.length > 0 &&
          capturedImage.map((item, index) => {
            return (
              <div
                key={index}
                className="w-28 h-28 max-w-[7rem] flex-grow border border-dashed border-gray-500 rounded-lg relative transition ease-in-out duration-200 hover:scale-105"
              >
                <span
                  onClick={() => removeCapturedImage(index)}
                  className="absolute top-3 right-3 bg-red-500 rounded-full text-white hover:bg-red-600 hover:text-white text-xl cursor-pointer p-2 transition ease-in-out hover:scale-110 duration-150"
                >
                  <FaRegTrashAlt size={16} />
                </span>
                <img
                  className="object-contain p-1 h-full w-full rounded-lg cursor-pointer"
                  onClick={() => selectImage(index)}
                  src={FormatedUrlImage(item)}
                  alt="image-captured"
                />
              </div>
            );
          })}
      </div>
      {showModal && (
        <ModalImageViewer
          images={capturedImage}
          title="Imagenes"
          show={showModal}
          onClose={onClose}
          currentIndex={image}
        />
      )}
    </div>
  );
};

export default CameraComponent;
