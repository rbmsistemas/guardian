import { Suspense, lazy, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "../utils/Loading";
import Login from "../pages/auth/Login";
import NotFound from "../pages/notFound/NotFound";

import Context from "../context/Context";
const CompanyForm = lazy(() => import("../pages/company/CompanyForm"));
const ShowCompany = lazy(() => import("../pages/company/ShowCompany"));
const Company = lazy(() => import("../pages/company/Company"));
const Home = lazy(() => import("../pages/home/Home"));
const Inventory = lazy(() => import("../pages/inventory/Inventory"));
const Actividad = lazy(() => import("../pages/actividad/Actividad"));
const ActividadForm = lazy(() => import("../pages/actividad/ActividadForm"));
const InventoryForm = lazy(() => import("../pages/inventory/InventoryForm"));
const ShowInventory = lazy(() => import("../pages/inventory/ShowInventory"));
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
            <Route path="/inventario" element={<Inventory />} />
            <Route path="/inventario/crear" element={<InventoryForm />} />
            <Route path="/inventario/editar/:id" element={<InventoryForm />} />
            <Route path="/inventario/ver/:id" element={<ShowInventory />} />
            <Route path="/actividades" element={<Actividad />} />
            <Route path="/actividades/crear" element={<ActividadForm />} />
            <Route path="/actividades/editar/:id" element={<ActividadForm />} />
            <Route path="/actividades/ver/:id" element={<ShowInventory />} />
            <Route path="/company" element={<Company />} />
            <Route path="/company/crear" element={<CompanyForm />} />
            <Route path="/company/editar/:id" element={<CompanyForm />} />
            <Route path="/company/ver/:id" element={<ShowCompany />} />
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
