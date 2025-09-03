import { format } from "date-fns";

export const formatDate = date => format(new Date(date),  "MMM, dd, yyyy");
 
