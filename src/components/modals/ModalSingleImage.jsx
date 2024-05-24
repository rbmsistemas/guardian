// import React from "react";
// import LightGallery from "lightgallery/react";
// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lg-zoom.css";
// import "lightgallery/css/lg-fullscreen.css";
// import "lightgallery/css/lg-rotate.css";

// import lgZoom from "lightgallery/plugins/zoom";
// import lgFullscreen from "lightgallery/plugins/fullscreen";
// import lgRotate from "lightgallery/plugins/rotate";

// const ModalSingleImage = ({
//   image,
//   title,
//   elementClassNames = "",
//   imageClassNames = "",
// }) => {
//   return (
//     <LightGallery
//       plugins={[lgZoom, lgFullscreen, lgRotate]}
//       elementClassNames={`custom-lightgallery ${elementClassNames}`}
//     >
//       <a href={image}>
//         <img
//           src={image}
//           alt={title}
//           className={`object-cover w-full h-full cursor-pointer ${imageClassNames}`}
//         />
//       </a>
//     </LightGallery>
//   );
// };

// export default ModalSingleImage;

import React, { useRef, useEffect } from "react";
import lightGallery from "lightgallery";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-rotate.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgRotate from "lightgallery/plugins/rotate";

const ModalSingleImage = ({
  image,
  title,
  elementClassNames,
  imageClassNames,
}) => {
  const galleryRef = useRef(null);

  useEffect(() => {
    const gallery = lightGallery(galleryRef.current, {
      plugins: [lgThumbnail, lgZoom, lgFullscreen, lgRotate],
      speed: 500,
    });
    return () => {
      gallery.destroy();
    };
  }, []);

  return (
    <div ref={galleryRef} className="gallery">
      <a className={elementClassNames} href={image}>
        <img className={imageClassNames} src={image} alt={title} />
      </a>
    </div>
  );
};

export default ModalSingleImage;
