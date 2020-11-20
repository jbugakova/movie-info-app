export interface Genre {
  name: string;
  id: number;
}

export interface MovieShortInfo {
  id: number;
  title: string;
  genres: string;
  releaseDate: Date;
  posterPath: string;
  voteAverage: number;
}

export interface MoviesResponse {
  page: number;
  totalPages: number;
  results: MovieShortInfo[];
}

export interface DetailedMovie {
  id: number;
  title: string;
  backdropPath: string;
  voteAverage: number;
  tagline: string;
  genres: Genre[];
  runtime: number;
  releaseDate: Date;
  productionCountries: string[];
  budget: number;
  revenue: number;
  overview: string;
  trailers: Trailer[];
}

export interface Trailer {
  key: string;
  name: string;
}

export interface SimilarMovie {
  id: number;
  title: string;
  poster: string;
}
