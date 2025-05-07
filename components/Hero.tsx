import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Plus } from 'lucide-react-native';
import { Movie } from '@/types';
import { getBackdropUrl } from '@/utils/api';

interface HeroProps {
  movie: Movie;
}

const { width, height } = Dimensions.get('window');

const Hero: React.FC<HeroProps> = ({ movie }) => {
  const router = useRouter();

  const handleMoviePress = () => {
    router.push(`/movie/${movie.id}`);
  };

  const handleWatchPress = () => {
    // In a real app, this would trigger video playback
    console.log('Watch pressed for movie:', movie.id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={handleMoviePress}
        style={styles.imageContainer}
      >
        <Image
          source={{ uri: getBackdropUrl(movie.backdrop_path) }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)', '#000']}
          style={styles.gradient}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.genres}>
            {movie.genres.map(g => g.name).join(' • ')}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.watchButton}
              onPress={handleWatchPress}
              activeOpacity={0.8}
            >
              <Play size={16} color="#fff" />
              <Text style={styles.watchText}>Watch</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleMoviePress}
              activeOpacity={0.8}
            >
              <Plus size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.6,
    marginBottom: 24,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    fontSize: 28,
    marginBottom: 8,
  },
  genres: {
    fontFamily: 'Inter-Regular',
    color: '#ddd',
    fontSize: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 12,
  },
  watchText: {
    fontFamily: 'Inter-Medium',
    color: '#fff',
    marginLeft: 8,
    fontSize: 15,
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default Hero;