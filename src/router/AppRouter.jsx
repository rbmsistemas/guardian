import { Suspense, lazy, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "../utils/Loading";
import Login from "../pages/auth/Login";
import NotFound from "../pages/notFound/NotFound";
import SSL from "../FA2141ACF7A6F70C29B4FFE00875EEDA.txt";

import Context from "../context/Context";
const ProveedoresForm = lazy(() =>
  import("../pages/proveedores/ProveedoresForm")
);
const VerProovedores = lazy(() =>
  import("../pages/proveedores/VerProovedores")
);
const Proveedores = lazy(() => import("../pages/proveedores/Proveedores"));
const Home = lazy(() => import("../pages/home/Home"));
const Inventario = lazy(() => import("../pages/inventary/Inventario"));
const Actividad = lazy(() => import("../pages/actividad/Actividad"));
const ActividadForm = lazy(() => import("../pages/actividad/ActividadForm"));
const InventaryForm = lazy(() => import("../pages/inventary/InventaryForm"));
const ShowInventario = lazy(() => import("../pages/inventary/ShowInventario"));
const Nav = lazy(() => import("../components/navbar/Navbar"));

const LoginRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Nav>
          <Routes>
            <Route path="/.well-known/pki-validation/FA2141ACF7A6F70C29B4FFE00875EEDA.txt" elemetn={<SSL />} />
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
            <Route path="/actividades/crear" element={<ActividadForm />} />
            <Route path="/actividades/editar/:id" element={<ActividadForm />} />
            <Route path="/actividades/ver/:id" element={<ShowInventario />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/proveedores/crear" element={<ProveedoresForm />} />
            <Route
              path="/proveedores/editar/:id"
              element={<ProveedoresForm />}
            />
            <Route path="/proveedores/ver/:id" element={<VerProovedores />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Nav>
      </Router>
    </Suspense>
  );
};

const AppRouter = () => {
  const { user } = useContext(Context);
  return user.token ? <AuthRouter /> : <LoginRouter />;
};

export default AppRouter;
