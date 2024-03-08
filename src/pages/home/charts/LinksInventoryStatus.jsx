import React, { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import classNames from "classnames";

const LinksInventoryStatus = ({
  id,
  title,
  shortTitle,
  icon: Icon,
  linkTo,
  amount,
  gradientFrom = "",
  gradientTo = "",
  loading = false,
}) => {
  let returnView = null;

  const [isHovered, setIsHovered] = useState(false);

  if (loading) {
    returnView = (
      <BounceLoader color={"#ffffff"} loading={loading} className="text-lg" />
    );
  }

  if (!loading) {
    returnView = (
      <div
        className={`flex flex-col items-center justify-evenly w-full h-full`}
      >
        <p className="text-4xl font-bold">{amount}</p>
        <Link
          to={linkTo}
          className={`flex items-center justify-center gap-2 py-2 px-4 bg-white/20 rounded-full `}
        >
          <span className="text-xl 2xl:text-2xl">
            <Icon />
          </span>
          <p className="text-sm font-semibold hidden md:block">{title}</p>
          <p className="text-xs font-semibold md:hidden">{shortTitle}</p>
          <span className="text-xs font-semibold hidden md:block w-4 h-4">
            <FaArrowCircleRight
              className={`text-xl transform transition ease-in-out duration-100 ${
                isHovered ? "scale-100" : "scale-0"
              }`}
            />
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div
      key={id}
      id={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={classNames(
        "h-full min-h-28 w-full bg-gradient-to-tr text-white p-2 rounded-lg shadow-md flex items-center justify-center gap-2 transition ease-in-out duration-200 relative",
        gradientFrom,
        gradientTo
      )}
    >
      {returnView}
    </div>
  );
};

export default LinksInventoryStatus;
