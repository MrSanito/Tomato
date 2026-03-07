import { useState } from "react";
import { useAppData } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { authService } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

const SelectRole = () => {
  type Role = "customer" | "rider" | "seller" | null;
  const [role, setRole] = useState(null);
  const { setUser } = useAppData();
  const navigate = useNavigate();

  const roles: Role[] = ["customer", "rider", "seller"];

  const addRole = async () => {
    try { 
      const token = localStorage.getItem("token")
      const { data } = await axios.put(`${authService}/add/role`, {role}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data)

      localStorage.setItem("token", data.token);
      setUser(data.user);

      navigate("/", { replace: true });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 ">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-bold">Choose your role</h1>

        <div className="space-y-6">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`
          w-full rounded-xl border px-4 py-3 text-sm font-medium capitalize transition ${
            role === r
              ? "border border-[#E23744] bg-[#E23744]"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-500"
          }
          `}
            >
              Continue as {r}
            </button>
          ))}
        </div>
      <button
        disabled={!role}
        onClick={addRole}
        className={` w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${role ? "border border-[#E23744] bg-[#E23744] hover:bg[#d32f3a]" : "bg-gray-200 text-gray-400 cursor-not-allowed"} `}
      >
        select
       </button>
      </div>
    </div>
  );
};

export default SelectRole;
