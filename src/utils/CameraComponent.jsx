import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdCameraswitch, MdFlashOff, MdFlashOn } from "react-icons/md";
import { FormatedUrlImage } from "./FormatedUrlImage";
import ModalImageViewer from "../components/modals/ModalImageViewer";
import CameraPhoto, {
  FACING_MODES,
  IMAGE_TYPES,
} from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const CameraComponent = ({
  capturedImage = [],
  setCapturedImage,
  enableCamera,
}) => {
  const mediaStreamRef = useRef(null);
  const [currentFacingMode, setCurrentFacingMode] = useState("environment");

  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFlash, setisFlash] = useState(false);
  const cordova = window.cordova;
  const diagnostic = cordova?.plugins?.diagnostic;

  const notifyError = (error) => toast.error(error);

  const videoConstraints = {
    facingMode: currentFacingMode,
  };

  useEffect(() => {
    const checkCameraPermission = async () => {
      if (cordova) {
        diagnostic.getPermissionAuthorizationStatus(
          function (status) {
            switch (status) {
              case diagnostic.permissionStatus.GRANTED:
                // Permiso otorgado, puedes usar la cámara
                break;
              case diagnostic.permissionStatus.NOT_REQUESTED:
              case diagnostic.permissionStatus.DENIED:
              case diagnostic.permissionStatus.DENIED_ALWAYS:
                // Permiso no otorgado, solicita permiso al usuario
                diagnostic.requestRuntimePermission(
                  diagnostic.permission.CAMERA,
                  function (status) {
                    if (status === diagnostic.permissionStatus.GRANTED) {
                      // Permiso otorgado, puedes usar la cámara
                    } else {
                      // Permiso no otorgado, maneja el escenario correspondiente
                    }
                  },
                  function (error) {
                    // Maneja cualquier error al solicitar permiso
                  }
                );
                break;
            }
          },
          function (error) {
            // Maneja cualquier error al verificar el estado del permiso
          }
        );
      }
    };

    checkCameraPermission(); // Verifica el permiso al cargar el componente
  }, []);

  const captureImage = async (image) => {
    try {
      if (cordova) {
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
        const imageSrc = image;

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
    <div className="w-full h-full grid grid-cols-1 gap-4">
      {enableCamera && (
        <div className="relative flex flex-col gap-4">
          <p
            className="text-2xl text-white absolute top-5 right-5 bg-black/20 p-2 rounded-full cursor-pointer z-10"
            onClick={switchCamera}
          >
            <MdCameraswitch color="#ffffff" />
          </p>
          {/* <p
          className="text-2xl text-white absolute top-5 left-5 bg-black/20 p-2 rounded-full cursor-pointer z-10"
          onClick={toggleFlash}
        >
          {isFlash ? (
            <MdFlashOn color="#ff0" />
          ) : (
            <MdFlashOff color="#ffffff" />
          )}
        </p> */}
          <CameraPhoto
            onTakePhoto={(dataUri) => captureImage(dataUri)}
            idealFacingMode={currentFacingMode}
            idealResolution={{ width: 1920, height: 1080 }}
            isSilentMode={true}
            imageType={IMAGE_TYPES.JPG}
          />
        </div>
      )}
      <div className="w-full h-full max-h-full flex flex-wrap gap-4 mt-2 md:mt-0">
        <div className="w-32 h-32 gap-2 items-center justify-center rounded-md hover:bg-gray-50 transition-all ease-in-out duration-200 shadow-md p-4">
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
            accept="image/*"
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
                className=" relative w-32 h-32 max-w-[7rem] flex-grow items-center justify-center rounded-md hover:bg-gray-50 transition-all ease-in-out duration-200 shadow-md"
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
