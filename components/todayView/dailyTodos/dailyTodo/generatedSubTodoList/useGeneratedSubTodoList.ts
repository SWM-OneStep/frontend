import { useState } from 'react';
import tmpOrderGenerator from '../../../../../utils/tmpOrderGenerator';
import { useSubTodoAddMutation } from '../../../../../hooks/api/useSubTodoMutations';
import { useTheme } from '@ui-kitten/components';

const useGeneratedSubTodoList = ({
  generatedSubTodos,
  setGeneratedSubTodos,
}) => {
  const theme = useTheme();
  const [subTodoCandidatesIndexes, setSubTodoCandidatesIndexes] = useState([]);
  const { mutate: addSubTodo } = useSubTodoAddMutation();

  const handleApplySelection = () => {
    const newSubTodos = subTodoCandidatesIndexes.map(index => ({
      content: generatedSubTodos[index].content,
      date: generatedSubTodos[index].date,
      todo: generatedSubTodos[index].todo,
      order: tmpOrderGenerator(index),
    }));
    addSubTodo({ todoData: newSubTodos });
    setGeneratedSubTodos([]);
    setSubTodoCandidatesIndexes([]);
  };

  const handleGeneratedSubTodoAcceptIconPress = index => {
    if (subTodoCandidatesIndexes.includes(index)) {
      setSubTodoCandidatesIndexes(prev => {
        return prev.filter(candidate => candidate !== index);
      });
    } else {
      setSubTodoCandidatesIndexes(prev => {
        return [...prev, index];
      });
    }
  };

  const FillGeneratedSubTodoAcceptIcon = index => {
    let color;
    subTodoCandidatesIndexes.includes(index)
      ? (color = 'color-primary-500')
      : (color = 'text-basic-color');
    return theme[color];
  };

  return {
    subTodoCandidatesIndexes,
    setSubTodoCandidatesIndexes,
    handleApplySelection,
    handleGeneratedSubTodoAcceptIconPress,
    FillGeneratedSubTodoAcceptIcon,
  };
};

export default useGeneratedSubTodoList;
