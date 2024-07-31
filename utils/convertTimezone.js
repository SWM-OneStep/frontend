export const convertGmtToKst = date => {
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kstDate;
};
