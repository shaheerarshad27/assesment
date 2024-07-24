export interface Location {
  latitude: number;
  longitude: number;
}

export interface Restaurant {
  place_id: string;
  name: string;
  vicinity: string;
  distance: number;
  rating: number;
  user_ratings_total: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}
