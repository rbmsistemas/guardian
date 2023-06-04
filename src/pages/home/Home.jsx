import React from "react";
import Mercancia from "../../assets/img/mercancia.png";
import GuardianLogo from "../../assets/img/guardian_logo.png";
import GapLogo from "../../assets/img/images.jfif";
const Home = () => {
  return (
    <div className="flex justify-center min-h-full">
      <div className="flex flex-col gap-4 justify-center items-center p-5">
        <h1 className="text-4xl font-bold text-center">
          Bienvenido a Guardian
        </h1>
        <div className="flex justify-center items-center gap-3">
          <img
            src={GuardianLogo}
            className="h-10 md:h-20 w-auto"
            alt="Guardian Logo"
          />
          <img src={GapLogo} className="h-10 md:h-20 w-auto" alt="Gap Logo" />
        </div>
      </div>
    </div>
  );
};

export default Home;
