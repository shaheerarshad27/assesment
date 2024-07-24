import React, {memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Make sure to install react-native-vector-icons
import {styles} from '../styles/style';
import {COLORS} from '../constants/colors';
const Rating = ({rating, totalStars = 5}) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5;
  const emptyStars = totalStars - filledStars - (halfStar ? 1 : 0);

  return (
    <View style={styles.ratingContainer}>
      {[...Array(filledStars)].map((_, index) => (
        <TouchableOpacity key={`filled-${index}`}>
          <FontAwesome name="star" size={15} color={COLORS.star} />
        </TouchableOpacity>
      ))}
      {halfStar && (
        <TouchableOpacity key={`half`}>
          <FontAwesome name="star-half" size={15} color={COLORS.star} />
        </TouchableOpacity>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <TouchableOpacity key={`empty-${index}`}>
          <FontAwesome name="star-o" size={15} color={COLORS.star} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default memo(Rating);
