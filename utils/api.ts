import { Movie, Cast } from '@/types';

// Base API details
const API_KEY = 'api_key_placeholder';  // In real app, use .env
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Mock data for development
export const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Dune: Part Two',
    poster_path: '/4hTWF1L7IhNKnjRxL4oaGE98z3Y.jpg',
    backdrop_path: '/j0Y9LS9AauzDBUUlbfVZDHCQICI.jpg',
    vote_average: 8.5,
    release_date: '2024-02-28',
    overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.',
    genres: [{ id: 878, name: 'Science Fiction' }, { id: 12, name: 'Adventure' }],
    runtime: 166,
    tagline: 'Long live the fighters.',
  },
  {
    id: 2,
    title: 'The Godfather',
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    vote_average: 8.7,
    release_date: '1972-03-14',
    overview: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
    genres: [{ id: 18, name: 'Drama' }, { id: 80, name: 'Crime' }],
    runtime: 175,
    tagline: 'An offer you can\'t refuse.',
  },
  {
    id: 3,
    title: 'Oppenheimer',
    poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop_path: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
    vote_average: 8.0,
    release_date: '2023-07-19',
    overview: 'The story of J. Robert Oppenheimers role in the development of the atomic bomb during World War II.',
    genres: [{ id: 18, name: 'Drama' }, { id: 36, name: 'History' }],
    runtime: 180,
    tagline: 'The world forever changes.',
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    backdrop_path: '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    vote_average: 8.5,
    release_date: '1994-09-10',
    overview: 'A burger-loving hit man, his philosophical partner, a drug-addled gangster\'s moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.',
    genres: [{ id: 53, name: 'Thriller' }, { id: 80, name: 'Crime' }],
    runtime: 154,
    tagline: 'Just because you are a character doesn\'t mean you have character.',
  },
  {
    id: 5,
    title: 'Interstellar',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/pbrkL804c8yAv3zBZR4QPEafpAR.jpg',
    vote_average: 8.4,
    release_date: '2014-11-05',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
    genres: [{ id: 878, name: 'Science Fiction' }, { id: 12, name: 'Adventure' }],
    runtime: 169,
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
  },
  {
    id: 6,
    title: 'The Dark Knight',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop_path: '/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg',
    vote_average: 8.4,
    release_date: '2008-07-16',
    overview: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.',
    genres: [{ id: 18, name: 'Drama' }, { id: 28, name: 'Action' }, { id: 80, name: 'Crime' }],
    runtime: 152,
    tagline: 'Why So Serious?',
  }
];

// Mock cast data
export const mockCast: Cast[] = [
  { id: 1, name: 'Timothée Chalamet', character: 'Paul Atreides', profile_path: '/ysgBGWnyNx4tlY0vDJxCgxbbaGl.jpg' },
  { id: 2, name: 'Zendaya', character: 'Chani', profile_path: '/6TE2AlOUqcrs7CyJiWYgmzjCx9x.jpg' },
  { id: 3, name: 'Rebecca Ferguson', character: 'Lady Jessica', profile_path: '/lJloTOheuQSirSLXNA3ZHwyJ8y3.jpg' },
  { id: 4, name: 'Javier Bardem', character: 'Stilgar', profile_path: '/oGTo5ff0UCyR7g5DaUjlOyTVoB7.jpg' }
];

// Get popular movies
export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    // In a real app, this would be a fetch call to the API
    // const response = await fetch(`${BASE_URL}/movie/popular?${API_KEY}&language=en-US&page=1`);
    // return await response.json();
    
    // For now, return mock data
    return mockMovies;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Get now playing movies
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    // For now, return mock data
    return mockMovies.slice(0, 3);
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    return [];
  }
};

// Get top rated movies
export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    // For now, return mock data
    return mockMovies.slice(3);
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};

// Get movie details
export const getMovieDetails = async (id: number): Promise<Movie | null> => {
  try {
    // For now, return mock data
    const movie = mockMovies.find(movie => movie.id === id);
    return movie || null;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    return null;
  }
};

// Get movie cast
export const getMovieCast = async (id: number): Promise<Cast[]> => {
  try {
    // For now, return mock data
    return mockCast;
  } catch (error) {
    console.error(`Error fetching cast for movie ID ${id}:`, error);
    return [];
  }
};

// Search movies
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    // For now, filter mock data
    if (!query) return [];
    return mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error(`Error searching movies with query "${query}":`, error);
    return [];
  }
};

// Format poster URL
export const getPosterUrl = (path: string, size: string = 'w500'): string => {
  if (!path) return '';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Format backdrop URL
export const getBackdropUrl = (path: string, size: string = 'original'): string => {
  if (!path) return '';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Format profile URL
export const getProfileUrl = (path: string | null, size: string = 'w185'): string => {
  if (!path) return 'https://via.placeholder.com/185x278?text=No+Image';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};