import { Input, Text } from '@ui-kitten/components';
import { Todo } from '../../../types/todo';

interface EditableListItemTitleProps {
  isEditing: boolean;
  content: string;
  setContent: (value: string) => void;
  handleSubmitEditing: () => void;
  item: Todo;
}

const EditableTextField = ({
  isEditing,
  content,
  setContent,
  handleSubmitEditing,
  item,
}: EditableListItemTitleProps) => {
  return isEditing ? (
    <Input
      value={content}
      onChangeText={setContent}
      onSubmitEditing={handleSubmitEditing}
      autoFocus={true}
    />
  ) : (
    <Text>{item.content}</Text>
  );
};

export default EditableTextField;
