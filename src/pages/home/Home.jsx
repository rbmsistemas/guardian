import React from "react";
import Mercancia from "../../assets/img/mercancia.png";
const Home = () => {
  return (
    <div className="flex justify-center min-h-full pt-20">
      <div className="flex flex-col justify-center items-center p-5">
        <h1 className="text-4xl font-bold text-center">
          Bienvenido a gapStock
        </h1>
        <p className="text-xl text-center">
          Este es un sistema de inventarios para la empresa Aeropuerto de Puerto
          Vallarta S.A de C.V
        </p>
        <img
          src={Mercancia}
          className="h-72 lg:h-96 w-auto"
          alt="Flowbite Logo"
        />
      </div>
    </div>
  );
};

export default Home;
