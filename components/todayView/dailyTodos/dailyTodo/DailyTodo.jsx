import '@/locales/index';
import SubTodoGenerateModal from '../../../SubTodoGenerateModal';
import TodoListItem from './todoListItem/TodoListItem';
import useModal from '../../../../hooks/common/useModal';
import SubTodoList from './subTodoList/SubTodoList';
import useDailyTodo from './useDailyTodo';
import GeneratedSubTodoList from './generatedSubTodoList/GeneratedSubTodoList';
import TodoModal from '../../../TodoModal';

const DailyTodo = ({ item, drag, isActive }) => {
  const {
    isEditing,
    setIsEditing,
    subTodoInputActivated,
    setSubTodoInputActivated,
    generatedSubTodos,
    setGeneratedSubTodos,
  } = useDailyTodo();

  const {
    isVisible: isSubTodoGenerateModalVisible,
    setIsVisible: setIsSubTodoGenerateModalVisible,
  } = useModal();

  const { isVisible: isTodoModalVisible, setIsVisible: setIsTodoModalVisible } =
    useModal();

  const handleSubTodoCreate = () => {
    setIsTodoModalVisible(false);
    setSubTodoInputActivated(true);
  };
  const handleEdit = () => {
    setIsEditing(true);
    setIsTodoModalVisible(false);
  };

  return (
    <>
      <TodoListItem
        item={item}
        drag={drag}
        isActive={isActive}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setIsSubTodoGenerateModalVisible={setIsSubTodoGenerateModalVisible}
        setIsTodoModalVisible={setIsTodoModalVisible}
      />
      <SubTodoList
        item={item}
        subTodoInputActivated={subTodoInputActivated}
        setSubTodoInputActivated={setSubTodoInputActivated}
      />
      <GeneratedSubTodoList
        generatedSubTodos={generatedSubTodos}
        setGeneratedSubTodos={setGeneratedSubTodos}
      />
      <TodoModal
        item={item}
        isTodo={true}
        visible={isTodoModalVisible}
        setVisible={setIsTodoModalVisible}
        onEdit={handleEdit}
        onSubTodoCreate={handleSubTodoCreate}
      />
      <SubTodoGenerateModal
        modalVisible={isSubTodoGenerateModalVisible}
        setModalVisible={setIsSubTodoGenerateModalVisible}
        setGeneratedSubToDos={setGeneratedSubTodos}
        todoId={item.id}
      />
    </>
  );
};

export default DailyTodo;
