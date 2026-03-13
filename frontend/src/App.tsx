import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import PublicRoutes from "./Components/publicRoutes";
import ProtectedRoutes from "./Components/protectedRoutes";
import SelectRole from "./pages/SelectRole";
import { Navbar } from "./Components/Navbar";
import Account from "./pages/Account";
import { useAppData } from "./context/AppContext";
import Restaurant from "./pages/Restaurant";

function App() {

  const {user}= useAppData()
  console.log(user)

  if(user && user.role === "seller") {
    return <Restaurant/>
  }
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
