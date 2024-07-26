import { create } from 'zustand';
import useTodoStore from './TodoStore';

const useModalStore = create((set, get) => ({
  isEditing: false,
  modalVisible: false,
  subTodoInputActivated: false,
  setSubTodoInputActivated: value => {
    set(state => ({ subTodoInputActivated: value }));
  },
  setIsEditing: editing => {
    set(state => ({ isEditing: editing }));
  },
  setModalVisible: visible => {
    set(state => ({ modalVisible: visible }));
  },
  openModal: item => {
    get().setIsEditing(false);
    get().setModalVisible(true);
    useTodoStore.getState().setSelectedTodo(item);
  },
  closeModal: () => {
    if (useTodoStore.getState().selectedTodo != null) {
      get().setModalVisible(false);
      useTodoStore.getState().setSelectedTodo(null);
    }
  },
  openEditModal: () => {
    get().setIsEditing(true);
    get().setModalVisible(false);
  },
  closeEditModal: () => {
    get().setIsEditiong(false);
    get().setModalVisible(false);
  },
}));

export default useModalStore;
