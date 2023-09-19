import { urlEnv } from "../api/request.api";

export const FormatedUrlImage = (src) => {
  if (src instanceof File) {
    return URL.createObjectURL(src);
  } else if (src.startsWith("http")) {
    return src;
  } else {
    return `${urlEnv}${src}`;
  }
};
