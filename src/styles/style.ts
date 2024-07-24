// src/styles/styles.js

import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_SIZES} from '../constants/fontSizes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.black,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  customMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  callout: {
    width: 200,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  calloutTitle: {
    fontSize: FONT_SIZES.calloutTitle,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.black,
  },
  calloutText: {
    fontSize: FONT_SIZES.calloutText,
    marginBottom: 5,
    color: COLORS.black,
  },
  calloutDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  calloutDistanceText: {
    fontSize: FONT_SIZES.calloutDistanceText,
    marginLeft: 5,
    color: COLORS.black,
  },
  calloutRating: {
    fontSize: FONT_SIZES.calloutRating,
    fontWeight: 'bold',
    color: COLORS.yellow,
  },
  errorText: {
    color: COLORS.red,
    fontSize: FONT_SIZES.errorText,
    marginBottom: 10,
    textAlign: 'center',
  },
});
