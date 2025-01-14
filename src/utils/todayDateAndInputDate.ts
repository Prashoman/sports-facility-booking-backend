export const todayDateAndInputDate = (inputData: string) => {
  const givenDate = new Date(inputData as string);
  const today = new Date();
  givenDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return { givenDate, today };
};
