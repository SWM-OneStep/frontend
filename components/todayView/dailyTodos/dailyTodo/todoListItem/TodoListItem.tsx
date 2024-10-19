import React from 'react';
import { ListItem } from '@ui-kitten/components';
import { RenderItemParams } from 'react-native-draggable-flatlist';
import useTodoListItem from './useTodoListItem';
import { IconButton } from '../../../../common/molecules/IconButton';
import getIconFillColor from '../../../../../utils/getIconFillColor';
import { Todo } from '../../../../../types/todo';
import EditableTextField from '../../../../common/molecules/EditableTextField';

interface TodoListItemProps extends RenderItemParams<Todo> {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubTodoGenerateModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsTodoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  item,
  drag,
  isActive,
  isEditing,
  setIsEditing,
  setIsSubTodoGenerateModalVisible,
  setIsTodoModalVisible,
}) => {
  const {
    theme,
    handleCheckIconPress,
    content,
    setContent,
    handleTodoListItemPress,
    handleTodoListItemSubmitEditing,
    handleGenerateIconPress,
    handleSettingIconPress,
  } = useTodoListItem({
    item,
    isEditing,
    setIsEditing,
    setIsSubTodoGenerateModalVisible,
    setIsTodoModalVisible,
  });

  const accessoryLeft = (props?) => {
    return (
      <IconButton
        props={props}
        onPress={handleCheckIconPress}
        iconName="checkmark-circle-2-outline"
        fill={getIconFillColor(item.isCompleted, theme)}
      />
    );
  };

  const accessoryRight = (props?) => {
    return (
      <IconButton.IconButtonContainer>
        {item.children.length === 0 && !item.isCompleted && (
          <IconButton
            props={props}
            iconName={'flash-outline'}
            onPress={handleGenerateIconPress}
            fill={theme['text-basic-color']}
          />
        )}
        <IconButton
          props={props}
          onPress={handleSettingIconPress}
          iconName={'more-horizontal-outline'}
          fill={theme['text-basic-color']}
        />
      </IconButton.IconButtonContainer>
    );
  };

  const title = () => (
    <EditableTextField
      isEditing={isEditing}
      content={content}
      setContent={setContent}
      handleSubmitEditing={handleTodoListItemSubmitEditing}
      item={item}
    />
  );

  return (
    <>
      <ListItem
        key={item.id}
        accessoryLeft={accessoryLeft}
        accessoryRight={props => accessoryRight(props)}
        onPress={handleTodoListItemPress}
        onLongPress={drag}
        disabled={isActive}
        title={title}
      />
    </>
  );
};

export default TodoListItem;
