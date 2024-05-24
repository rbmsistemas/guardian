import React from "react";
import LightGallery from "lightgallery/react";
import classNames from "classnames";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-rotate.css";
import "lightgallery/css/lg-zoom.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgRotate from "lightgallery/plugins/rotate";
import lgZoom from "lightgallery/plugins/zoom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { FormatedUrlImage } from "../../utils/FormatedUrlImage";
import "react-lazy-load-image-component/src/effects/blur.css";

const ModalImages = ({ images = [], title = "", imageClassname = "" }) => {
  const onInit = () => {
    try {
      console.log("lightGallery has been initialized");
    } catch (error) {
      console.error("Error initializing lightGallery:", error);
    }
  };

  return (
    <div className="gallery">
      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgFullscreen, lgRotate]}
        elementClassNames="flex flex-wrap justify-start gap-2 lg:gap-4"
      >
        {images?.map((image, index) => (
          <a key={index} href={FormatedUrlImage(image)}>
            <LazyLoadImage
              effect="blur"
              className={classNames(
                "object-cover aspect-square overflow-hidden w-full h-full max-w-[6rem] max-h-[6rem] cursor-pointer rounded-md ring-2 ring-purple-300 bg-gray-200 hover:ring-4 hover:ring-purple-500 transition ease-in-out duration-200",
                imageClassname
              )}
              src={FormatedUrlImage(image)}
              alt={title || "Imagen"}
            />
          </a>
        ))}
      </LightGallery>
    </div>
  );
};

export default ModalImages;

// To do: continuar con la mgiracion al nuevo visualizador de imagenes
