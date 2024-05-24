import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import classNames from "classnames";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FormatedUrlImage } from "../../utils/FormatedUrlImage";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-photo-view/dist/react-photo-view.css";

const ModalImages = ({
  images = [],
  title = "",
  imageClassname = "",
  containerClassName,
}) => {
  if (!images.length) {
    return null;
  }

  return (
    <PhotoProvider
      speed={() => 500}
      toolbarRender={({ onScale, scale, rotate, onRotate }) => {
        return (
          <>
            <svg
              onClick={() => onScale(scale + 1)}
              className="PhotoView-Slider__toolbarIcon"
              width="50px"
              height="50px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                fill="#ffffff"
                fill-rule="evenodd"
                d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2zM8 6.5a1 1 0 112 0V8h1.5a1 1 0 110 2H10v1.5a1 1 0 11-2 0V10H6.5a1 1 0 010-2H8V6.5z"
              />
            </svg>
            <svg
              onClick={() => onScale(scale - 1)}
              className="PhotoView-Slider__toolbarIcon"
              width="50px"
              height="50px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                fill="#ffffff"
                fill-rule="evenodd"
                d="M9 4a5 5 0 100 10A5 5 0 009 4zM2 9a7 7 0 1112.6 4.2.999.999 0 01.107.093l3 3a1 1 0 01-1.414 1.414l-3-3a.999.999 0 01-.093-.107A7 7 0 012 9zm10.5 0a1 1 0 00-1-1h-5a1 1 0 100 2h5a1 1 0 001-1z"
              />
            </svg>
            <svg
              onClick={() => onRotate(rotate + 90)}
              className="PhotoView-Slider__toolbarIcon"
              fill="#ffffff"
              width="45px"
              height="45px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 214.367 214.367"
              xml:space="preserve"
            >
              <path
                d="M202.403,95.22c0,46.312-33.237,85.002-77.109,93.484v25.663l-69.76-40l69.76-40v23.494
	c27.176-7.87,47.109-32.964,47.109-62.642c0-35.962-29.258-65.22-65.22-65.22s-65.22,29.258-65.22,65.22
	c0,9.686,2.068,19.001,6.148,27.688l-27.154,12.754c-5.968-12.707-8.994-26.313-8.994-40.441C11.964,42.716,54.68,0,107.184,0
	S202.403,42.716,202.403,95.22z"
              />
            </svg>
          </>
        );
      }}
    >
      <div
        className={classNames(
          `flex flex-wrap justify-start gap-2 lg:gap-4`,
          containerClassName
        )}
      >
        {images?.map((image, index) => (
          <PhotoView key={index} src={FormatedUrlImage(image)}>
            <LazyLoadImage
              effect="blur"
              className={classNames(
                "w-full h-full object-cover max-w-[6rem] max-h-[6rem] cursor-pointer rounded-md ring-2 ring-purple-300 bg-gray-200 hover:ring-4 hover:ring-purple-500 transition ease-in-out duration-200",
                imageClassname
              )}
              src={FormatedUrlImage(image)}
              alt={title || "Imagen"}
            />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
};

export default ModalImages;
