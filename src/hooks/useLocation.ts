import {useState, useCallback} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Location} from '../types/types';
import {useError} from './useError';

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const {handleError} = useError();

  const getLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => {
        handleError(`Error getting location: ${error.message}`);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [handleError]);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'We need access to your location to show nearby restaurants',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          handleError('Location permission denied');
        }
      } catch (err) {
        handleError(`Error requesting location permission: ${err}`);
      }
    } else {
      getLocation();
    }
  }, [getLocation, handleError]);

  return {location, requestLocationPermission, setLocation};
};
