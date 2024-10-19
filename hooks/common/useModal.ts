import { useState } from 'react';

interface UseModal {
  isVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const useModal = (): UseModal => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return {
    isVisible,
    openModal,
    closeModal,
    setIsVisible,
  };
};

export default useModal;
