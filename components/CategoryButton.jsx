import { Button, Icon, Text } from '@ui-kitten/components';

const CategoryButton = ({ text, color }) => {
  return (
    <Button
      accessoryLeft={props => <Icon {...props} name="star" fill={color} />}
    >
      <Text>{text}</Text>
    </Button>
  );
};

export default CategoryButton;
