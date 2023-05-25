import "./App.css";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen h-auto bg-slate-100">
      <AppRouter />
      <Toaster />
    </div>
  );
}

export default App;
