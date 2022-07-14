import moment from "moment";

export const dateFormatter = (date: Date): string => {
  return moment(date).format("DD/MM/YYYY HH:mm");
}