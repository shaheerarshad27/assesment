import React, {memo} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import {Location, Restaurant} from '../types/types';
import {styles} from '../styles/style';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Rating from './Rating';
import {COLORS} from '../constants/colors';
interface MapViewComponentProps {
  location: Location;
  restaurants: Restaurant[];
}

const getMarkerColor = (distance: number): string => {
  if (distance < 0.5) return COLORS.green;
  if (distance < 1) return COLORS.yellow;
  if (distance < 2) return COLORS.orange;
  return COLORS.red;
};

const CustomMarker = ({color}: {color: string}) => (
  <View style={[styles.customMarker, {backgroundColor: color}]}>
    <MaterialCommunityIcons name="food-fork-drink" size={24} color="white" />
  </View>
);

const CustomCallout = ({restaurant}: {restaurant: Restaurant}) => (
  <View style={styles.callout}>
    <Text style={styles.calloutTitle}>{restaurant.name}</Text>
    <Text style={styles.calloutText}>{restaurant.vicinity}</Text>
    <View style={styles.calloutDistance}>
      <MaterialCommunityIcons
        name="map-marker-distance"
        size={16}
        color={COLORS.gray}
      />
      <Text style={styles.calloutDistanceText}>
        {restaurant.distance.toFixed(2)} km
      </Text>
    </View>
    {restaurant.rating && (
      <Text style={styles.calloutRating}>
        Rating: <Rating rating={restaurant.rating} />
      </Text>
    )}

    <Text style={styles.calloutRating}>
      Reviews: {restaurant.user_ratings_total}
    </Text>
  </View>
);
const MapViewComponent: React.FC<MapViewComponentProps> = ({
  location,
  restaurants,
  setLocation,
}) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      showsMyLocationButton
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      onRegionChangeComplete={e => setLocation(e)}>
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title="You"
        pinColor="blue"
      />
      {restaurants.map(restaurant => (
        <Marker
          key={restaurant.place_id}
          coordinate={{
            latitude: restaurant.geometry.location.lat,
            longitude: restaurant.geometry.location.lng,
          }}>
          <CustomMarker color={getMarkerColor(restaurant.distance)} />
          <Callout>
            <CustomCallout restaurant={restaurant} />
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

export default memo(MapViewComponent);
