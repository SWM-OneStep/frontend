const tmpOrderGenerator = (seed: number = 0): string => {
  const now: Date = new Date();
  const milliseconds: number = now.getTime();
  const unixTime: number = Math.floor(milliseconds + seed);
  return unixTime.toString();
};

export default tmpOrderGenerator;
