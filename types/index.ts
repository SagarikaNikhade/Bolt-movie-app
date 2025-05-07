export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  genres: Genre[];
  runtime?: number;
  tagline?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieSection {
  title: string;
  endpoint: string;
  movies: Movie[];
}

export interface User {
  name: string;
  avatar: string;
  watchedCount: number;
  favGenres: string[];
  memberSince: string;
}