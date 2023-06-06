import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-black/40 flex justify-center items-center">
      <HashLoader color={"#fd933e"} loading={true} size={75} />
    </div>
  );
};

export default Loading;
