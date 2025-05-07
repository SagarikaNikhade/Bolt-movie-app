import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Text, TouchableOpacity } from 'react-native';
import { searchMovies } from '@/utils/api';
import { Movie, Genre } from '@/types';
import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import GenreChip from '@/components/GenreChip';

// Unique list of genres from all movies
const uniqueGenres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedGenres]);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const results = await searchMovies(searchQuery);
      
      // Filter by selected genres if any are selected
      const filteredResults = selectedGenres.length > 0
        ? results.filter(movie => 
            movie.genres.some(genre => selectedGenres.includes(genre.id))
          )
        : results;
      
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const toggleGenre = (genreId: number) => {
    setSelectedGenres(prevSelected => 
      prevSelected.includes(genreId)
        ? prevSelected.filter(id => id !== genreId)
        : [...prevSelected, genreId]
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>
        {searchQuery ? 'No results found' : 'Search for your favorite movies'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery 
          ? 'Try a different search term or remove filters' 
          : 'Use the search bar above to find movies'
        }
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>
      
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={handleClearSearch}
      />
      
      <View style={styles.genreContainer}>
        <FlatList
          data={uniqueGenres}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreList}
          renderItem={({ item }) => (
            <GenreChip
              label={item.name}
              isSelected={selectedGenres.includes(item.id)}
              onPress={() => toggleGenre(item.id)}
            />
          )}
        />
      </View>
      
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <MovieCard movie={item} size="large" />
          </View>
        )}
        numColumns={1}
        contentContainerStyle={styles.resultsList}
        ListEmptyComponent={renderEmptyState}
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
  genreContainer: {
    marginVertical: 8,
  },
  genreList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsList: {
    paddingHorizontal: 16,
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
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
});