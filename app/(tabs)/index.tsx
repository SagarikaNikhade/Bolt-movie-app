import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies } from '@/utils/api';
import { Movie } from '@/types';
import Hero from '@/components/Hero';
import MovieList from '@/components/MovieList';

export default function HomeScreen() {
  const [featured, setFeatured] = useState<Movie | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all movie data
        const popular = await getPopularMovies();
        const nowPlaying = await getNowPlayingMovies();
        const topRated = await getTopRatedMovies();
        
        // Set featured movie (first movie from popular)
        if (popular.length > 0) {
          setFeatured(popular[0]);
        }
        
        setPopularMovies(popular);
        setNowPlayingMovies(nowPlaying);
        setTopRatedMovies(topRated);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovies();
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {featured && <Hero movie={featured} />}
        
        <View style={styles.listsContainer}>
          <MovieList 
            title="Now Playing" 
            movies={nowPlayingMovies} 
            cardSize="medium"
          />
          
          <MovieList 
            title="Popular" 
            movies={popularMovies.slice(1)} 
            cardSize="small"
          />
          
          <MovieList 
            title="Top Rated" 
            movies={topRatedMovies} 
            cardSize="medium"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  listsContainer: {
    paddingBottom: 30,
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
});