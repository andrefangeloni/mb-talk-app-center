import React from 'react';
import { Alert } from 'react-native';

import api from '../services/api';

import * as S from './styles';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release: string;
  poster_path: string;
}

interface MovieAPI {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const Home: React.FC = () => {
  const [page, setPage] = React.useState(2);
  const [totalPages, setTotalPages] = React.useState(0);
  const [movies, setMovies] = React.useState<Movie[]>([]);

  React.useEffect(() => {
    try {
      const loadMovies = async () => {
        const { data } = await api.get<MovieAPI>('/movie/popular');
        setMovies(data.results);
        setTotalPages(data.total_pages);
      };

      loadMovies();
    } catch (err) {
      Alert.alert('Error', 'Error on loading movies');
    }
  }, []);

  const onLoadMoreMovies = () => {
    if (page > totalPages) {
      return;
    }

    try {
      const loadMovies = async () => {
        const { data } = await api.get<MovieAPI>('/movie/popular', {
          params: { page },
        });

        setPage((prevState) => prevState + 1);
        setMovies([...movies, ...data.results]);
      };

      loadMovies();
    } catch (err) {
      Alert.alert('Error', 'Error on loading movies');
    }
  };

  return (
    <S.Container>
      <S.Title>Popular Movies</S.Title>

      <S.MovieList
        data={movies}
        numColumns={2}
        onEndReachedThreshold={1}
        onEndReached={() => onLoadMoreMovies()}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <S.Touchable>
            <S.Poster poster={item.poster_path} />
          </S.Touchable>
        )}
      />
    </S.Container>
  );
};

export default Home;
