

export const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

export const getFormattedTodayDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };