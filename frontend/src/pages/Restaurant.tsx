import { useEffect, useState } from "react";
import type { IRestaurant } from "../types";
import { restaurantService } from "../main";
import axios from "axios";

const Restaurant = () => {
  
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [loading, setLoading] = useState(true)

  const fetchMyRestaurant = async () => {
    try {

      const { data } = await axios.get(
        `${restaurantService}/restaurant/myRestaurant`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      
      setRestaurant(data.restaurant || null)

      if(data.token) {
        localStorage.setItem("token",data.token)
      }
    } catch (error) {
      console.log(error)
      
    }finally {
      setLoading(false)
    }
    
  }


  useEffect(() => {
    fetchMyRestaurant()
  
    
  }, [ ])
  
  return <div>Restaurant</div>;
};

export default Restaurant;
