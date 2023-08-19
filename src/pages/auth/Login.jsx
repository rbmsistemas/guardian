import React, { useContext, useState } from "react";
import GapLogo from "../../assets/img/images.jfif";
import BG from "../../assets/img/aeropuerto-infraestructura.jpg";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import { toast } from "react-hot-toast";
import Loading from "../../utils/Loading";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(Context);
  const [user, setUser] = useState({
    user: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const notifyError = (text) => toast.error(text);
  const notifySuccess = (text) => toast.success(text);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!user.user || !user.password) {
        notifyError("Todos los campos son obligatorios.");
        setIsLoading(false);
        return;
      }
      const res = await handleLogin(user);
      if (res?.data) {
        setIsLoading(false);
        return notifyError(res.data.message);
      }
      notifySuccess("Bienvenido, has iniciado sesión correctamente.");
      notifySuccess(window.location.host);
      setTimeout(() => {
        navigate("/");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-full h-full flex items-center p-5 justify-center purple-filter bg-cover bg-center filter bg-no-repeat bg-blue-600/40"
      style={{
        backgroundImage: `url(${BG})`,
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded shadow-lg">
        <div>
          <img className="mx-auto h-12 w-auto" src={GapLogo} alt="gap-logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h2>
          <p className="text-center text-sm text-gray-600">
            Ingresa tus credenciales para acceder a la plataforma.
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="user" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="user"
                name="user"
                type="text"
                autoComplete="user"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Usuario o Correo electrónico"
                value={user.user}
                onChange={(e) => setUser({ ...user, user: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <span className="absolute z-10 inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Recuérdame
              </label>
            </div>
            <div className="text-sm">
              <a
                href="/acividades"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaLock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default Login;
