import "./App.css";
import AppProvider from "./context/AppProvider";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AppProvider>
      <div className="h-[100vh] bg-neutral-50">
        <AppRouter />
        <Toaster />
      </div>
    </AppProvider>
  );
}

export default App;
