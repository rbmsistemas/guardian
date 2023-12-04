import React from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { urlEnv } from "../api/request.api";
import Loading from "../utils/Loading";

function ImageDownloader({ imageUrls }) {
  const [loading, setLoading] = React.useState(false);
  const downloadImages = async () => {
    setLoading(true);
    const zip = new JSZip();
    const folder = zip.folder("images");

    const promises = imageUrls.map(async (url, index) => {
      try {
        const response = await fetch(urlEnv + url);
        const blob = await response.blob();
        folder.file(`image_${index + 1}.jpg`, blob);
      } catch (error) {
        console.error(`Error descargando la imagen ${url}:`, error);
      }
    });

    await Promise.all(promises);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
    const fileName = `images_${formattedDate}.zip`;

    setLoading(false);
    zip.generateAsync({ type: "blob" }).then((content) => {
      FileSaver.saveAs(content, fileName);
    });
  };

  return (
    <>
      <button onClick={downloadImages}>
        <FaCloudDownloadAlt />
      </button>
      {loading && <Loading />}
    </>
  );
}

export default ImageDownloader;
