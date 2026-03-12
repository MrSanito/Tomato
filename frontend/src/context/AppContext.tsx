import axios from "axios";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { authService } from "../main";
import { type User, type AppContextType, type LocationData } from "../types";

const AppContext = createContext<AppContextType | undefined>(undefined);
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [city, setCity] = useState("");

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${authService}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setUser(data.user || data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      return alert("Please Allow Location to Continue");
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
         const res = await fetch(
           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
         );


         const data = await res.json();
         console.warn(data)

         const cityName =
           data.address.city ||
           data.address.town ||
           data.address.village ||
           data.address.county ||
           "Your Location";

         setLocation({
           latitude,
           longitude,
           formattedAddress: data.display_name || "Current Location",
         });

         setCity(cityName);
      } catch (error) {
          console.log(error);

          setLocation({
            latitude,
            longitude,
            formattedAddress: "Current Location",
          });

          setCity("Failed to load");
      }
    });

    
  }, [ ]);

  return (
    <AppContext.Provider
      value={{ isAuth, loading, setIsAuth, setLocation, setUser, user , location, loadingLocation , city}}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within AppProvider");
  }

  return context;
};
