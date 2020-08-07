import { months } from "./constants";

export const reformatDate = (date_string) => {
    let [year, month, day] = date_string.split("-");
    month = month.toString();
    return `${day} ${months[month]} ${year}`;
};
