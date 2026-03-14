import type React from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

export interface AppContextType {
  user: User | null;
  loading: boolean;
  isAuth: boolean;
  location: LocationData | null;

  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setLocation: React.Dispatch<React.SetStateAction<LocationData | null>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  loadingLocation: boolean;
  city: string;
}

export interface IRestaurant  {
  _id: string, 
  name: string;
  description?: string;
  image: string;
  ownerId: string;
  phone: number;
  isVerified: boolean;
  autoLocation: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude],
    formattedAddress: string;
  };

  isOpen: boolean;
  createAt: Date;
}