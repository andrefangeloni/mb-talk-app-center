import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import posterNotFound from '../assets/images/poster-not-found.jpg';

import { colors } from '../styles';

interface PosterProps {
  poster: string;
}

const posterPrefixUrl = 'https://image.tmdb.org/t/p/w500';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const Title = styled.Text`
  font-size: 36px;
  align-self: center;
  margin-bottom: 20px;
  color: ${colors.title};
`;

export const MovieList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  columnWrapperStyle: { justifyContent: 'space-between' },
})`
  flex: 1;
  padding: 0 8px;
` as unknown as typeof FlatList;

export const Touchable = styled.TouchableOpacity``;

export const Poster = styled.Image.attrs(({ poster }: PosterProps) => ({
  resize: 'contain',
  source: poster ? { uri: `${posterPrefixUrl}${poster}` } : posterNotFound,
}))<PosterProps>`
  width: 180px;
  height: 290px;
  margin-bottom: 16px;
`;

export const FooterText = styled.Text`
  align-self: center;
  margin-top: 8px;
  color: ${colors.footerText};
`;

export const Bold = styled.Text`
  font-weight: bold;
`;
