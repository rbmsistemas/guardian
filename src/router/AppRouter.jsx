import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "../utils/Loading";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";
import Inventario from "../pages/inventary/Inventario";
import Nav from "../components/navbar/Navbar";
import NotFound from "../pages/notFound/NotFound";
import InventaryForm from "../pages/inventary/InventaryForm";
import ShowInventario from "../pages/inventary/ShowInventario";
import Actividad from "../pages/actividad/Actividad";

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/inventario/crear" element={<InventaryForm />} />
            <Route path="/inventario/editar/:id" element={<InventaryForm />} />
            <Route path="/inventario/ver/:id" element={<ShowInventario />} />
            <Route path="/actividades" element={<Actividad />} />
            <Route path="/actividades/crear" element={<InventaryForm />} />
            <Route path="/actividades/editar/:id" element={<InventaryForm />} />
            <Route path="/actividades/ver/:id" element={<ShowInventario />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Nav>
      </Router>
    </Suspense>
  );
};

export default AppRouter;
