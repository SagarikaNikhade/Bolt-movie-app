import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Star, Clock, Bookmark } from 'lucide-react-native';
import { Movie } from '@/types';
import { getBackdropUrl } from '@/utils/api';
import { isMovieSaved, saveMovie, removeSavedMovie } from '@/utils/storage';

interface MovieDetailHeaderProps {
  movie: Movie;
}

const { width, height } = Dimensions.get('window');

const MovieDetailHeader: React.FC<MovieDetailHeaderProps> = ({ movie }) => {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if movie is saved when component mounts
    const checkIfSaved = async () => {
      const saved = await isMovieSaved(movie.id);
      setIsSaved(saved);
    };
    
    checkIfSaved();
  }, [movie.id]);

  const handleGoBack = () => {
    router.back();
  };

  const handleToggleSave = async () => {
    if (isSaved) {
      await removeSavedMovie(movie.id);
      setIsSaved(false);
    } else {
      await saveMovie(movie);
      setIsSaved(true);
    }
  };

  const formatRuntime = (minutes: number | undefined) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: getBackdropUrl(movie.backdrop_path) }}
        style={styles.backdrop}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)', '#000']}
        style={styles.gradient}
      />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleGoBack}
        activeOpacity={0.7}
      >
        <ChevronLeft size={24} color="#fff" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleToggleSave}
        activeOpacity={0.7}
      >
        <Bookmark 
          size={24} 
          color="#fff"
          fill={isSaved ? "#fff" : "transparent"}
        />
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        
        {movie.tagline && (
          <Text style={styles.tagline}>"{movie.tagline}"</Text>
        )}
        
        <View style={styles.infoContainer}>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFC107" fill="#FFC107" />
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
          </View>
          
          {movie.runtime && (
            <View style={styles.runtimeContainer}>
              <Clock size={14} color="#ccc" />
              <Text style={styles.runtime}>{formatRuntime(movie.runtime)}</Text>
            </View>
          )}
          
          <Text style={styles.year}>
            {movie.release_date ? movie.release_date.split('-')[0] : ''}
          </Text>
        </View>
        
        <View style={styles.genreContainer}>
          {movie.genres.map((genre) => (
            <View key={genre.id} style={styles.genrePill}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.45,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  saveButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    fontSize: 24,
    marginBottom: 4,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    color: '#ddd',
    fontSize: 14,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rating: {
    fontFamily: 'Inter-Medium',
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
  },
  runtimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  runtime: {
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    marginLeft: 4,
    fontSize: 14,
  },
  year: {
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    fontSize: 14,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genrePill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontFamily: 'Inter-Medium',
    color: '#fff',
    fontSize: 12,
  },
});

export default MovieDetailHeader;