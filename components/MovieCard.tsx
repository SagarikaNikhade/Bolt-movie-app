import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Movie } from '@/types';
import { getPosterUrl } from '@/utils/api';
import { Star } from 'lucide-react-native';

interface MovieCardProps {
  movie: Movie;
  size?: 'small' | 'medium' | 'large';
}

const { width } = Dimensions.get('window');

const MovieCard: React.FC<MovieCardProps> = ({ movie, size = 'medium' }) => {
  const router = useRouter();
  
  const getCardWidth = () => {
    switch(size) {
      case 'small':
        return width * 0.28;
      case 'large':
        return width * 0.8;
      case 'medium':
      default:
        return width * 0.4;
    }
  };
  
  const styles = StyleSheet.create({
    container: {
      width: getCardWidth(),
      marginRight: 12,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: '#1a1a1a',
    },
    image: {
      width: '100%',
      height: getCardWidth() * 1.5,
      borderRadius: 12,
    },
    textContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 10,
    },
    gradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '50%',
      borderRadius: 12,
    },
    title: {
      fontFamily: 'Inter-Bold',
      color: '#fff',
      fontSize: size === 'small' ? 13 : 15,
      marginBottom: 4,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      fontFamily: 'Inter-Regular',
      color: '#fff',
      marginLeft: 4,
      fontSize: size === 'small' ? 11 : 13,
    },
    year: {
      fontFamily: 'Inter-Regular',
      color: '#ccc',
      fontSize: size === 'small' ? 11 : 13,
    },
  });

  const handlePress = () => {
    router.push(`/movie/${movie.id}`);
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: getPosterUrl(movie.poster_path) }} 
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.ratingContainer}>
            <Star size={size === 'small' ? 10 : 12} color="#FFC107" fill="#FFC107" />
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
          </View>
          <Text style={styles.year}>
            {movie.release_date ? movie.release_date.split('-')[0] : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;