import { ThemeType } from '@ui-kitten/components';

export const getIconFillColor = (
  completed: boolean,
  theme: ThemeType,
): string => {
  return completed ? theme['color-primary-500'] : theme['text-basic-color'];
};
export default getIconFillColor;
