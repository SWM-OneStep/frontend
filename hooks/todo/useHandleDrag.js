import { LexoRank } from 'lexorank';
import useTodoStore from '@/contexts/TodoStore';
import { useTodoUpdateMutation } from '@/hooks/api/useTodoMutations';

const useHandleDrag = (currentTodos, setCurrentTodos) => {
  const { mutate: updateTodo } = useTodoUpdateMutation();
  const ExistingOrders = useTodoStore(state => state.ExistingOrders);

  // TODO: newData 혹은 updatedData에 문제가 있어 순서가 변경되지 않고 있음. 수정 필요
  const handleDragEnd = ({ from, to, data: newData }) => {
    if (!newData || newData.length === 0) return;
    if (from === to) {
      return;
    }

    let updatedOrder;
    let prevTodoId = null;
    let nextTodoId = null;

    const ensureUniqueOrder = order => {
      let uniqueOrder = order;
      while (true) {
        if (!ExistingOrders.includes(uniqueOrder.toString())) {
          break;
        }
        if (to === 0) {
          uniqueOrder = uniqueOrder.genPrev();
        } else if (to === newData.length - 1) {
          uniqueOrder = uniqueOrder.genNext();
        } else {
          const lexoOrderPrev = uniqueOrder;
          const lexoOrderNext = LexoRank.parse(newData[to + 1].order);
          uniqueOrder = lexoOrderPrev.between(lexoOrderNext);
        }
      }
      return uniqueOrder.toString();
    };

    const orderedNewData = newData.map((item, index) => {
      if (index !== to) {
        return item;
      }
      let proposedOrder;
      if (to === 0) {
        proposedOrder = LexoRank.parse(newData[to + 1].order).genPrev();
        nextTodoId = newData[to + 1].id;
      } else if (to === newData.length - 1) {
        proposedOrder = LexoRank.parse(newData[to - 1].order).genNext();
        prevTodoId = newData[to - 1].id;
      } else {
        const lexoOrderPrev = LexoRank.parse(newData[to - 1].order);
        const lexoOrderNext = LexoRank.parse(newData[to + 1].order);
        proposedOrder = lexoOrderPrev.between(lexoOrderNext);
        prevTodoId = newData[to - 1].id;
        nextTodoId = newData[to + 1].id;
      }
      updatedOrder = ensureUniqueOrder(proposedOrder);
      return {
        ...item,
        order: updatedOrder,
      };
    });
    setCurrentTodos(orderedNewData);
    const updatedData = {
      todo_id: newData[to].id,
      order: {
        prev_id: prevTodoId,
        next_id: nextTodoId,
        updated_order: updatedOrder,
      },
    };
    updateTodo({ updatedData });
  };

  return handleDragEnd;
};

export default useHandleDrag;
