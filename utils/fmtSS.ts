import { format } from "date-fns";

export const fmtSS = (timestamp: string | number) => {
  return format(new Date(Number(timestamp)), "dd MMM, yyyy");
};
