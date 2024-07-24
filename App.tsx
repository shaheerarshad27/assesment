import React from 'react';
import {View, Text} from 'react-native';
import {useLocation} from './src/hooks/useLocation';
import {useNearbyRestaurants} from './src/hooks/useNearbyRestaurants';
import MapViewComponent from './src/components/MapView';
import {useError} from './src/hooks/useError';
import {styles} from './src/styles/style';

const App: React.FC = () => {
  const {location, requestLocationPermission, setLocation} = useLocation();
  const {restaurants, fetchNearbyRestaurants} = useNearbyRestaurants();
  const {error, clearError} = useError();

  React.useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  React.useEffect(() => {
    if (location) {
      fetchNearbyRestaurants(location);
    }
  }, [location, fetchNearbyRestaurants]);

  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Restaurants</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {location ? (
        <MapViewComponent
          setLocation={setLocation}
          location={location}
          restaurants={restaurants}
        />
      ) : (
        <Text>Fetching location...</Text>
      )}
    </View>
  );
};

export default App;
