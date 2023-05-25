import React from "react";
import { PulseLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <PulseLoader color={"#36D7B7"} loading={true} size={20} />
    </div>
  );
};

export default Loading;
