import React from 'react';
import { List, ListItem } from '@ui-kitten/components';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import useGeneratedSubTodoList from './useGeneratedSubTodoList';
import { IconButton } from '../../../../common/molecules/IconButton';

const GeneratedSubTodoList = ({ generatedSubTodos, setGeneratedSubTodos }) => {
  const { t } = useTranslation();
  const {
    handleApplySelection,
    handleGeneratedSubTodoAcceptIconPress,
    FillGeneratedSubTodoAcceptIcon,
  } = useGeneratedSubTodoList({
    generatedSubTodos,
    setGeneratedSubTodos,
  });

  const generatedSubtodoAcceptIcon = (index, props?) => {
    return (
      <IconButton
        onPress={() => handleGeneratedSubTodoAcceptIconPress(index)}
        fill={FillGeneratedSubTodoAcceptIcon(index)}
        iconName="done-all-outline"
        {...props}
      />
    );
  };

  const renderGeneratedTodo = ({ item, index }) => {
    return (
      <ListItem
        title={item.content}
        key={index}
        style={{ paddingLeft: 40 }}
        accessoryRight={generatedSubtodoAcceptIcon(index)}
      />
    );
  };

  return (
    <>
      <List
        data={generatedSubTodos}
        renderItem={renderGeneratedTodo}
        contentContainerStyle={{ marginLeft: 40, paddingLeft: 40 }}
      />
      {generatedSubTodos.length > 0 && (
        <Button onPress={() => handleApplySelection()}>
          {t('components.dailyTodo.apply')}
        </Button>
      )}
    </>
  );
};

export default GeneratedSubTodoList;
