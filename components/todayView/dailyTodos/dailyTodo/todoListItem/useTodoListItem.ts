import { useContext, useState } from 'react';
import { useTodoUpdateMutation } from '../../../../../hooks/api/useTodoMutations';
import { LoginContext } from '../../../../../contexts/LoginContext';
import {
  DAILYTODO_LIST_CLICK_EVENT,
  DAILYTODO_MEATBALLMENU_CLICK_EVENT,
  DAILYTODO_TODOCOMPLETE_CLICK_EVENT,
  handleLogEvent,
} from '../../../../../utils/logEvent';
import { useTheme } from '@ui-kitten/components';

const useTodoListItem = ({
  item,
  isEditing,
  setIsEditing,
  setIsSubTodoGenerateModalVisible,
  setIsTodoModalVisible,
}) => {
  const [content, setContent] = useState<string>(item.content);
  const { mutate: updateTodo } = useTodoUpdateMutation();
  const { userId } = useContext(LoginContext);
  const theme = useTheme();

  const checkIconlogPressEvent = () => {
    handleLogEvent(DAILYTODO_TODOCOMPLETE_CLICK_EVENT, {
      time: new Date().toISOString(),
      userId: userId,
      todoId: item.id,
    });
  };
  const updateTodoStatusAsComplete = () => {
    const updatedData = {
      todoId: item.id,
      isCompleted: !item.isCompleted,
    };
    updateTodo({ updatedData });
  };
  const handleCheckIconPress = () => {
    checkIconlogPressEvent();
    updateTodoStatusAsComplete();
  };

  const handleTodoListItemPress = () => {
    handleLogEvent(DAILYTODO_LIST_CLICK_EVENT, {
      time: new Date().toISOString(),
      userId: userId,
      todoId: item.id,
    });
    setIsTodoModalVisible(true);
  };

  const handleTodoContentUpdate = () => {
    const updatedData = {
      todoId: item.id,
      content: content,
    };
    updateTodo({ updatedData });
  };

  const handleTodoListItemSubmitEditing = () => {
    handleTodoContentUpdate();
    setIsEditing(false);
  };

  const handleGenerateIconPress = () => {
    setIsSubTodoGenerateModalVisible(true);
  };

  const handleSettingIconPress = () => {
    handleLogEvent(DAILYTODO_MEATBALLMENU_CLICK_EVENT, {
      time: new Date().toISOString(),
      userId: userId,
      todoId: item.id,
    });
    setIsTodoModalVisible(true);
  };

  return {
    theme,
    handleCheckIconPress,
    content,
    setContent,
    isEditing,
    setIsEditing,
    handleTodoListItemPress,
    handleTodoListItemSubmitEditing,
    handleGenerateIconPress,
    handleSettingIconPress,
  };
};

export default useTodoListItem;
