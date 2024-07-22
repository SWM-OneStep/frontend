import { useState } from 'react';
import DailyTodos from './DailyTodos';

const exampleTodos = [
  {
    category_id: 1,
    category_color: '#FFC0CB',
    category_name: 'work',
    user_id: 1,
    todos: [
      {
        content: 'Item 1',
        subTodos: [{ content: 'Sub Item 1.1' }, { content: 'Sub Item 1.2' }],
      },
      {
        content: 'Item 2',
        subTodos: [{ content: 'Sub Item 2.1' }, { content: 'Sub Item 2.2' }],
      },
    ],
  },
  {
    category_id: 2,
    category_color: '#FFC0CB',
    category_name: 'exercise',
    user_id: 1,
    todos: [
      {
        content: 'Item 3',
        subTodos: [{ content: 'Sub Item 3.1' }, { content: 'Sub Item 3.2' }],
      },
      {
        content: 'Item 4',
        subTodos: [{ content: 'Sub Item 4.1' }, { content: 'Sub Item 4.2' }],
      },
    ],
  },
];

const CategoryTodos = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const selectedTodos = exampleTodos[0];

  return <DailyTodos todos={selectedTodos} />;
};

export default CategoryTodos;
