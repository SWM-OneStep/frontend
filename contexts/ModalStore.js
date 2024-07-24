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
    console.log('eeeeeeeeee');
    if (useTodoStore.getState().selectedTodo != null) {
      console.log('hihihihihi');
      get().setModalVisible(false);
      get().setSelectedTodo(null);
    }
  },
}));

export default useModalStore;
