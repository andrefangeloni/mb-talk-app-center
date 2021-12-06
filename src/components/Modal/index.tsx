import React from 'react';
import Modal from 'react-native-modal';

import * as S from './styles';

interface ModalProps {
  title: string;
  isVisible: boolean;
  description: string;
  onBackdropPress: () => void;
  onBackButtonPress: () => void;
}

const StyledModal: React.FC<ModalProps> = ({
  title,
  isVisible,
  description,
  onBackdropPress,
  onBackButtonPress,
}) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={onBackdropPress}
    onBackButtonPress={onBackButtonPress}
  >
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Container>
  </Modal>
);

export default StyledModal;
