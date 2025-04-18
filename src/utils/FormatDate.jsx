import dayjs from "dayjs";

export const formatMonthYear = (date) => {
  return dayjs(date).format("YYYY-MM");
};

export const formatDate = (date) => {
  return dayjs(date).format("DD-MM-YY");
};

export const formatDateDMY = (date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const formatDateTime = (date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

export const formatLongDate = (date) => {
  return dayjs(date).format("dddd, MMMM D, YYYY");
};
