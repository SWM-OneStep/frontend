export const isTodoIncludedInTodayView = ({
  startDate,
  endDate,
  currentDate,
}) => {
  if (startDate && endDate) {
    if (currentDate >= startDate && currentDate <= endDate) {
      return true;
    } else {
      return false;
    }
  } else if (startDate) {
    if (currentDate >= startDate) {
      return true;
    } else {
      return false;
    }
  } else if (endDate) {
    if (currentDate <= endDate) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
