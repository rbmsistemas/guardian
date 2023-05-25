import { Navbar } from "flowbite-react";
import React from "react";
import Logo from ".././../assets/img/images.jfif";

const Nav = () => {
  return (
    <Navbar className="shadow-md fixed w-full" fluid={true} rounded={true}>
      <Navbar.Brand to="/">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={true}>
          Inicio
        </Navbar.Link>
        <Navbar.Link href="/inventario">Inventario</Navbar.Link>
        <Navbar.Link href="/login">Iniciar Sesión</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
