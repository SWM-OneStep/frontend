import { LoginContext } from '@/contexts/LoginContext';
import { useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';

const InboxTodo = ({ item, drag, isActive }) => {
  const [content, setContent] = useState(item.content);
  const [isEditing, setIsEditing] = useState(false);
  const [subTodoInput, setSubTodoInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { accessToken } = useContext(LoginContext);
  const [subTodoInputActivated, setSubTodoInputActivated] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: addInboxTodo, isSuccess: addInboxTodoIsSuccess } = '';
  const { mutate: updateInboxTodo, isSuccess: updateInboxTodoIsSuccess } = '';
  const { mutate: deleteInboxTodo, isSuccess: deleteInboxTodoIsSuccess } = '';
};

export default InboxTodo;
