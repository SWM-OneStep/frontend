import { Button, Icon, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const CategoryButton = ({ text, color, isSelected }) => {
  return isSelected ? (
    <Button
      accessoryLeft={props => <Icon {...props} name="star" fill={color} />}
      style={styles.button}
      status="control"
    >
      <Text>{text}</Text>
    </Button>
  ) : (
    <Button
      accessoryLeft={props => <Icon {...props} name="star" fill={color} />}
      style={styles.button}
      status="basic"
    >
      <Text>{text}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 40,
  },
});

export default CategoryButton;
