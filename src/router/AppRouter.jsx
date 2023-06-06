import { Suspense, lazy, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "../utils/Loading";
import Login from "../pages/auth/Login";

import Context from "../context/Context";
const Home = lazy(() => import("../pages/home/Home"));
const Inventario = lazy(() => import("../pages/inventary/Inventario"));
const Actividad = lazy(() => import("../pages/actividad/Actividad"));
const InventaryForm = lazy(() => import("../pages/inventary/InventaryForm"));
const ShowInventario = lazy(() => import("../pages/inventary/ShowInventario"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const Nav = lazy(() => import("../components/navbar/Navbar"));

const LoginRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </Nav>
      </Router>
    </Suspense>
  );
};

const AuthRouter = () => {
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Nav>
      </Router>
    </Suspense>
  );
};

const AppRouter = () => {
  const { user } = useContext(Context);
  console.log(Object.keys(user));
  return Object.keys(user).length > 0 ? <AuthRouter /> : <LoginRouter />;
};

export default AppRouter;
