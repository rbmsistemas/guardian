import "./App.css";
import AppProvider from "./context/AppProvider";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen h-auto bg-slate-100">
        <AppRouter />
        <Toaster />
      </div>
    </AppProvider>
  );
}

export default App;
