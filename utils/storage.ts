import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '@/types';

const SAVED_MOVIES_KEY = 'savedMovies';

// Get all saved movies
export const getSavedMovies = async (): Promise<Movie[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(SAVED_MOVIES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting saved movies:', error);
    return [];
  }
};

// Save a movie
export const saveMovie = async (movie: Movie): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    
    // Check if movie is already saved
    if (!savedMovies.some(m => m.id === movie.id)) {
      const updatedMovies = [...savedMovies, movie];
      await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(updatedMovies));
    }
    return true;
  } catch (error) {
    console.error('Error saving movie:', error);
    return false;
  }
};

// Remove a saved movie
export const removeSavedMovie = async (movieId: number): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    const updatedMovies = savedMovies.filter(movie => movie.id !== movieId);
    await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(updatedMovies));
    return true;
  } catch (error) {
    console.error('Error removing saved movie:', error);
    return false;
  }
};

// Check if a movie is saved
export const isMovieSaved = async (movieId: number): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    return savedMovies.some(movie => movie.id === movieId);
  } catch (error) {
    console.error('Error checking if movie is saved:', error);
    return false;
  }
};