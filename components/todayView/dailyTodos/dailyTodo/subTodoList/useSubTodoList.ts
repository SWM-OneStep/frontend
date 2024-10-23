import React, { useContext } from 'react';
import { DateContext } from '../../../../../contexts/DateContext';
import { useSubTodoAddMutation } from '../../../../../hooks/api/useSubTodoMutations';

const useSubTodoList = ({ item, setSubTodoInputActivated }) => {
  const [subTodoInput, setSubtodoInput] = React.useState('');
  const { selectedDate } = useContext(DateContext);
  const { mutate: addSubTodo } = useSubTodoAddMutation();
  const handleSubtodoSubmit = () => {
    if (subTodoInput !== '') {
      const modifiedDate = selectedDate.format('YYYY-MM-DD');
      const subTodoData = [
        {
          todoId: item.id,
          content: subTodoInput,
          date: modifiedDate,
        },
      ];
      addSubTodo({ todoData: subTodoData });
      setSubtodoInput('');
      setSubTodoInputActivated(false);
    }
  };

  return { subTodoInput, setSubtodoInput, handleSubtodoSubmit };
};

export default useSubTodoList;
