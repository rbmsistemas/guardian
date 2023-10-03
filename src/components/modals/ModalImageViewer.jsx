import { Modal } from "flowbite-react";
import React, { useState, useEffect, useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaImage,
  FaDownload,
} from "react-icons/fa";
import { TbRotateClockwise2, TbRotate2 } from "react-icons/tb";
import { FormatedUrlImage } from "../../utils/FormatedUrlImage";
import { urlEnv } from "../../api/request.api";

const ModalImageViewer = ({
  title = "",
  images = [],
  currentIndex = 0,
  show = false,
  isDownloadImage = false,
  onClose = () => {},
}) => {
  const [image, setImage] = useState("");
  const [index, setIndex] = useState(currentIndex);
  const [rotate, setRotate] = useState("rotate-0");
  const [rotateCounter, setRotateCounter] = useState(0);
  const [scale, setScale] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const thumbnailsRef = useRef(null);

  const handleSelectImage = (img = "", index = 0) => {
    if (img === image) {
      return;
    }
    setImage(img);
    setIndex(index);
    setRotateCounter(0);

    setScrollPosition(thumbnailsRef.current.scrollLeft);
  };
  useEffect(() => {
    if (thumbnailsRef.current) {
      thumbnailsRef.current.scrollLeft = scrollPosition;
    }
  }, [image]);

  const handleNext = () => {
    if (index < images.length - 1) {
      setImage(images[index + 1]);
      setIndex(index + 1);
    } else {
      setImage(images[0]);
      setIndex(0);
    }
    setRotateCounter(0);
  };
  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setImage(images[index - 1]);
    } else {
      setIndex(images.length - 1);
      setImage(images[images.length - 1]);
    }
    setRotateCounter(0);
  };

  const handleRotateRight = () => {
    if (rotateCounter < 270) {
      setRotateCounter(rotateCounter + 90);
    } else {
      setRotateCounter(0);
    }
  };

  const handleRotateLeft = () => {
    if (rotateCounter > 0) {
      setRotateCounter(rotateCounter - 90);
    } else {
      setRotateCounter(270);
    }
  };

  useEffect(() => {
    setImage(images[currentIndex]);
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (rotateCounter === 0) {
      setRotate("rotate-0");
    }
    if (rotateCounter === 90) {
      setRotate("rotate-90");
    }
    if (rotateCounter === 180) {
      setRotate("rotate-180");
    }
    if (rotateCounter === 270) {
      setRotate("-rotate-90");
    }
  }, [rotateCounter]);

  const downloadImage = (imageUrl = "") => {
    console.log(imageUrl);
    fetch(urlEnv + imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  const handleDownload = () => {
    const imageUrl = image;
    downloadImage(imageUrl);
  };

  if (!show) {
    return null;
  }

  let modalBodyHeight = scale ? "85vh" : "65vh";

  return (
    <div>
      <Modal
        show={show}
        onClose={onClose}
        size={"5xl"}
        dismissible
        className="w-full h-full"
        style={{ height: "100vh", width: "100vw" }}
      >
        <Modal.Header style={{ padding: "10px" }}>
          <div className="flex gap-2 items-center">
            <span className="bg-blue-500 rounded-full p-2">
              <FaImage className="text-white text-xl" />
            </span>
            <p className="text-xl font-bold text-blue-500">Ver imagen</p>
          </div>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px", height: modalBodyHeight }}>
          <div className="w-full h-full grid grid-cols-1 grid-rows-12 justify-between items-end">
            <div className="w-full h-full min-h-max row-span-11 flex justify-center items-center relative overflow-hidden">
              <button
                type="button"
                className="absolute left-0 z-50 px-4 py-2 bg-white rounded-md text-gray-700 text-sm border border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
                onClick={handlePrev}
              >
                <FaChevronLeft />
              </button>
              <img
                onClick={() => setScale(!scale)}
                src={FormatedUrlImage(image)}
                alt={title}
                className={`transform ${rotate} ${
                  scale
                    ? "scale-150 cursor-zoom-out"
                    : "scale-100 cursor-zoom-in"
                } max-w-full max-h-full object-cover overflow-hidden transition ease-in-out duration-200`}
                style={{ maxHeight: "50vh" }}
              />
              <button
                type="button"
                className="absolute right-0 z-50 px-4 py-2 bg-white rounded-md text-gray-700 text-sm border border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
                onClick={handleNext}
              >
                <FaChevronRight />
              </button>
              <div className="absolute bottom-5 flex items-center justify-between w-auto whitespace-nowrap gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-white rounded-md text-gray-700 text-sm border border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
                  onClick={handleRotateLeft}
                >
                  <TbRotate2 />
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-white rounded-md text-gray-700 text-sm border border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
                  onClick={handleRotateRight}
                >
                  <TbRotateClockwise2 />
                </button>
                {isDownloadImage && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-white rounded-md text-gray-700 text-sm border border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
                    onClick={handleDownload}
                  >
                    <FaDownload />
                  </button>
                )}
              </div>
            </div>

            {!scale && (
              <div className="w-full row-span-1 h-auto flex flex-col md:flex-row gap-4 justify-between items-center px-4 py-2 bg-white border-t border-gray-200">
                <div className="font-semibold text-gray-700 text-sm truncate max-w-full w-full">
                  {title}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        {!scale && (
          <Modal.Footer style={{ padding: "10px" }}>
            <div
              ref={thumbnailsRef}
              className="w-full px-4 py-2 flex justify-start items-center overflow-x-auto gap-2"
            >
              {images.map((img, index) => (
                <div
                  className="bg-gray-200 rounded-md overflow-hidden border border-neutral-300 cursor-pointer w-24 h-24 min-h-fit min-w-fit max-h-24 max-w-[6rem]"
                  key={index}
                  // onMouseOver={() => handleSelectImage(img, index)}
                  onClick={() => handleSelectImage(img, index)}
                >
                  <img
                    className="object-cover min-w-[6rem] overflow-hidden w-full h-full max-w-[6rem] max-h-24"
                    src={FormatedUrlImage(img)}
                    alt={title}
                  />
                </div>
              ))}
            </div>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default ModalImageViewer;
