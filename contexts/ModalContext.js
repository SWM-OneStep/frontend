import { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, isModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  return (
    <ModalContext.Provider
      value={{
        isEditing,
        setIsEditing,
        modalVisible,
        isModalVisible,
        selectedTodo,
        setSelectedTodo,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
