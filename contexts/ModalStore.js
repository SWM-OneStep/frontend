import { create } from 'zustand';
import useTodoStore from './TodoStore';

const useModalStore = create((set, get) => ({
  isEditing: false,
  modalVisible: false,
  setIsEditing: editing => {
    set(state => ({ isEditing: editing }));
  },
  setModalVisible: visible => {
    set(state => ({ modalVisible: visible }));
  },
  openModal: item => {
    get().setModalVisible(true);
    useTodoStore.getState().setSelectedTodo(item);
  },
  closeModal: () => {
    if (useTodoStore.getState().selectedTodo != null) {
      get().setModalVisible(false);
      useTodoStore.getState().setSelectedTodo(null);
    }
  },
}));

export default useModalStore;
