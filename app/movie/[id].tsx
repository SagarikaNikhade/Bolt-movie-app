import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getMovieDetails, getMovieCast } from '@/utils/api';
import { Movie, Cast } from '@/types';
import MovieDetailHeader from '@/components/MovieDetailHeader';
import CastList from '@/components/CastList';

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        const movieId = parseInt(id as string);
        const movieData = await getMovieDetails(movieId);
        const castData = await getMovieCast(movieId);
        
        if (movieData) {
          setMovie(movieData);
          setCast(castData);
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF3B30" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Movie not found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <MovieDetailHeader movie={movie} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        
        <CastList cast={cast} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  errorText: {
    color: '#FF3B30',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  overview: {
    fontFamily: 'Inter-Regular',
    color: '#ddd',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 24,
  },
});