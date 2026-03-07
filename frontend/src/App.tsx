import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import PublicRoutes from "./Components/publicRoutes";
import ProtectedRoutes from "./Components/protectedRoutes";
import SelectRole from "./pages/SelectRole";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/select-role" element={<SelectRole />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
