import {useState, useCallback} from 'react';
import axios from 'axios';
import {Restaurant, Location} from '../types/types';
import {calculateDistance} from '../utils/geo';
import {useError} from './useError';

const API_KEY = 'AIzaSyBJWORfSMTXCcX3sHnQYyy8xQ0-k_QwobU'; // Replace with your actual API key

export const useNearbyRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const {handleError} = useError();

  const fetchNearbyRestaurants = useCallback(
    async (location: Location) => {
      const {latitude, longitude} = location;
      const radius = 1000; // Radius in meters (1 km)
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${API_KEY}`;

      try {
        const response = await axios.get(url);
        if (response.data.status !== 'OK') {
          throw new Error(`API returned status: ${response.data.status}`);
        }
        const restaurantsWithDistance = response.data.results
          ?.slice(0, 10)
          .map((restaurant: any) => ({
            ...restaurant,
            distance: calculateDistance(
              latitude,
              longitude,
              restaurant.geometry.location.lat,
              restaurant.geometry.location.lng,
            ),
          }));

        setRestaurants(restaurantsWithDistance);
      } catch (error) {
        handleError(
          `Error fetching nearby restaurants: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    },
    [handleError],
  );

  return {restaurants, fetchNearbyRestaurants};
};
