import dayjs from "dayjs";

export const formatDate = (date) => {
  return dayjs(date).format("DD-MM-YYYY");
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
