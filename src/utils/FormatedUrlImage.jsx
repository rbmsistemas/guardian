import { urlEnv } from "../api/request.api";
import NoImagenFound from "../assets/img/no_imagen.avif";

export const FormatedUrlImage = (src) => {
  if (src === null || src === undefined || src === "") {
    return NoImagenFound;
  }
  if (src instanceof File) {
    return URL.createObjectURL(src);
  } else if (typeof src === "string") {
    if (src.startsWith("http") || src.startsWith("https")) {
      return src;
    } else {
      return `${urlEnv}${src}`;
    }
  }
};
