import { StyleSheet } from 'react-native';
import React from 'react';
import { Input, List } from '@ui-kitten/components';
import DailySubTodo from './DailySubTodo';
import { useTranslation } from 'react-i18next';
import useSubTodoList from './useSubTodoList';
import { Todo } from '../../../../../types/todo';

interface SubTodoListProps {
  item: Todo;
  subTodoInputActivated: boolean;
  setSubTodoInputActivated: React.Dispatch<React.SetStateAction<boolean>>;
}

const renderSubTodo = ({ item, index }) => {
  return <DailySubTodo item={item} key={index} />;
};

const SubTodoList: React.FC<SubTodoListProps> = ({
  item,
  subTodoInputActivated,
  setSubTodoInputActivated,
}) => {
  const { t } = useTranslation();
  const { handleSubtodoSubmit, subTodoInput, setSubtodoInput } = useSubTodoList(
    { item, setSubTodoInputActivated },
  );

  return (
    <List
      data={item.children}
      renderItem={renderSubTodo}
      contentContainerStyle={{ marginLeft: 40, paddingLeft: 40 }}
      ListFooterComponent={
        subTodoInputActivated ? (
          <Input
            placeholder={t('components.dailyTodos.writeTodo')}
            style={styles.input}
            value={subTodoInput}
            onChangeText={nextInput => {
              setSubtodoInput(nextInput);
            }}
            autoFocus={true}
            onSubmitEditing={handleSubtodoSubmit}
          />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 40,
  },
  // backdrop: {
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
});

export default SubTodoList;
