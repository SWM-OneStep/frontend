import { useTodoUpdateMutation } from '@/hooks/api/useTodoMutations';

const useHandleDrag = (currentTodos, setCurrentTodos) => {
  const { mutate: updateTodo } = useTodoUpdateMutation();

  const handleDragEnd = ({ from, to, data: newData }) => {
    if (!newData || newData.length === 0) return;
    if (from === to) {
      return;
    }

    let prevTodoId = null;
    let nextTodoId = null;

    if (to === 0) {
      nextTodoId = newData[to + 1].id;
    } else if (to === newData.length - 1) {
      prevTodoId = newData[to - 1].id;
    } else {
      prevTodoId = newData[to - 1].id;
      nextTodoId = newData[to + 1].id;
    }

    const updatedData = {
      todo_id: newData[to].id,
      rank: {
        prevId: prevTodoId,
        nextId: nextTodoId,
      },
    };
    updateTodo({ updatedData });
  };

  return handleDragEnd;
};

export default useHandleDrag;
