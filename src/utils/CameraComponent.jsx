import React from "react";
import { AiOutlineCamera } from "react-icons/ai";
import "react-html5-camera-photo/build/css/index.css";
import ModalImages from "../components/modals/ModalImages";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const CameraComponent = ({
  capturedImage = [],
  setCapturedImage,
  enableCamera,
}) => {
  const captureImage = async (e) => {
    e.preventDefault();
    try {
      const photo = await Camera.getPhoto({
        quality: 50,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        correctOrientation: true,
        allowEditing: true,
        saveToGallery: true,
        webUseInput: true,
      });

      const imageUrl = photo.webPath;
      setCapturedImage([...capturedImage, imageUrl]);
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const removeCapturedImage = (index) => {
    const newCapturedImage = capturedImage.filter((item, i) => i !== index);
    setCapturedImage(newCapturedImage);
  };

  return (
    <div className="w-full h-full grid grid-cols-1 gap-4">
      {enableCamera && (
        <div className="relative flex flex-col gap-4 md:hidden">
          <button
            type="button"
            onClick={captureImage}
            className="flex items-center justify-center gap-2 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all ease-in-out duration-200"
          >
            Capturar Imagen
          </button>
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
        {/* {capturedImage.length > 0 &&
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
                  src={item}
                  alt="image-captured"
                />
              </div>
            );
          })} */}
      </div>
      <ModalImages
        enableDeleteImage={true}
        onDeleteImage={removeCapturedImage}
        images={capturedImage}
        title="Imagenes"
      />
    </div>
  );
};

export default CameraComponent;
