import { create } from 'zustand';
import useTodoStore from './TodoStore';

const useModalStore = create((set, get) => ({
  isEditing: false,
  modalVisible: false,
  selectedTodo: false,
  setIsEditing: editing => {
    set(state => ({ isEditing: editing }));
  },
  setModalVisible: visible => {
    set(state => ({ modalVisible: visible }));
  },
  setSelectedTodo: todo => {
    set(state => ({ selectedTodo: todo }));
  },
  openModal: item => {
    get().setModalVisible(true);
    get().setSelectedTodo(item);
  },
  closeModal: () => {
    if (useTodoStore.getState().selectedTodo != null) {
      get().setModalVisible(false);
      get().setSelectedTodo(null);
    }
  },
}));

export default useModalStore;
