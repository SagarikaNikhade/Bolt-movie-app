import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { getSavedMovies } from '@/utils/storage';
import { Movie } from '@/types';
import MovieCard from '@/components/MovieCard';

export default function SavedScreen() {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedMovies();
  }, []);

  const loadSavedMovies = async () => {
    try {
      setIsLoading(true);
      const movies = await getSavedMovies();
      setSavedMovies(movies);
    } catch (error) {
      console.error('Error loading saved movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No saved movies yet</Text>
      <Text style={styles.emptyDescription}>
        Movies you save will appear here for easy access.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Movies</Text>
      </View>
      
      <FlatList
        data={savedMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <MovieCard movie={item} size="large" />
          </View>
        )}
        numColumns={1}
        contentContainerStyle={styles.moviesList}
        ListEmptyComponent={renderEmptyState}
        onRefresh={loadSavedMovies}
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#fff',
  },
  moviesList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    flexGrow: 1,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 22,
  },
});