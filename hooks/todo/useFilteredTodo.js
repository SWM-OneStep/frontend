import { useEffect, useState } from 'react';
import { isTodoIncludedInTodayView } from '@/utils/dateUtils';

const useFilteredTodos = (todos, selectedCategory, selectedDate) => {
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    if (todos) {
      const filtered = todos.filter(
        todo =>
          todo.categoryId === selectedCategory &&
          isTodoIncludedInTodayView(
            todo.startDate,
            todo.endDate,
            selectedDate.format('YYYY-MM-DD'),
          ),
      );
      setFilteredTodos(filtered);
    }
  }, [todos, selectedCategory, selectedDate]);

  return filteredTodos;
};

export default useFilteredTodos;
