import { useAppData } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BiLogOut, BiMapPin, BiPackage } from "react-icons/bi";

const Account = () => {
  const { user, setUser, setIsAuth } = useAppData();

  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.setItem("token", "");
    setUser(null);
    setIsAuth(false);
    navigate("/login");
    toast.success("Logout Successful");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-md rounded-xl bg-white shadow-sm border">
        {/* Profile Section */}
        <div className="flex items-center gap-4 border-b p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-xl font-semibold text-white">
            {firstLetter}
          </div>

          <div>
            <h2 className="text-lg font-semibold">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="divide-y">
          <div
            className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => navigate("/orders")}
          >
            <BiPackage className="h-5 w-5 text-red-500" />
            <span className="font-medium text-gray-700">Your Orders</span>
          </div>

          <div
            className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => navigate("/addresses")}
          >
            <BiMapPin className="h-5 w-5 text-red-500" />
            <span className="font-medium text-gray-700">Your Addresses</span>
          </div>

          <div
            className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
            onClick={logoutHandler}
          >
            <BiLogOut className="h-5 w-5 text-red-500" />
            <span className="font-medium text-gray-700">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
