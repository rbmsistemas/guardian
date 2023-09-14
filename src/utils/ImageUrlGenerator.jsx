import NoImagenFound from "../assets/img/no_imagen.avif";
export const ImageUrlGenerator = (image) => {
  if (image) {
    return `${
      import.meta.env.VITE_API_URL || "http://localhost:4000"
    }/${image}`;
  } else {
    return NoImagenFound;
  }
};

export default ImageUrlGenerator;
