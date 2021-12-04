import React from 'react';
import { Alert } from 'react-native';
import AppCenterAnalytics from 'appcenter-analytics';

import { APP_VERSION } from '../../env.json';

import StyledModal from '../components/Modal';

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
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState({} as Movie);

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

  const onLoadMoreMovies = async () => {
    if (page > totalPages) {
      return;
    }

    try {
      const { data } = await api.get<MovieAPI>('/movie/popular', {
        params: { page },
      });

      setPage((prevState) => prevState + 1);
      setMovies([...movies, ...data.results]);
    } catch (err) {
      Alert.alert('Error', 'Error on loading movies');
    }
  };

  const onMoviePressed = (movie: Movie) => {
    setIsVisibleModal(true);
    setSelectedMovie(movie);

    AppCenterAnalytics.trackEvent('MoviePressed', {
      title: movie.title,
    });
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
          <S.Touchable onPress={() => onMoviePressed(item)}>
            <S.Poster poster={item.poster_path} />
          </S.Touchable>
        )}
      />

      <S.FooterText>
        Versão do App: <S.Bold>{APP_VERSION}</S.Bold>
      </S.FooterText>

      <StyledModal
        isVisible={isVisibleModal}
        title={selectedMovie.title}
        description={selectedMovie.overview}
        onBackdropPress={() => setIsVisibleModal(false)}
      />
    </S.Container>
  );
};

export default Home;
