import styled from 'styled-components/native';

import { colors } from '../../styles';

export const Container = styled.View`
  padding: 16px;
  border-radius: 8px;
  background-color: ${colors.modalBackground};
`;

export const Title = styled.Text`
  font-size: 20px;
  align-self: center;
  margin-bottom: 10px;
  color: ${colors.modalTitle};
`;

export const Description = styled.Text`
  text-align: justify;
  color: ${colors.modalDescription};
`;
