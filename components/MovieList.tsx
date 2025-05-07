import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import MovieCard from './MovieCard';
import { Movie } from '@/types';

interface MovieListProps {
  title: string;
  movies: Movie[];
  cardSize?: 'small' | 'medium' | 'large';
}

const MovieList: React.FC<MovieListProps> = ({ 
  title, 
  movies, 
  cardSize = 'medium'
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} size={cardSize} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    fontSize: 18,
    marginBottom: 12,
    marginLeft: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});

export default MovieList;