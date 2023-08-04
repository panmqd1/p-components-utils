import dayjs from "../node_modules/dayjs/dayjs.min.js";
const getAheadDateArr = (length, date) => {
  const arr = [];
  for (let i = length - 1; i >= 0; i--) {
    const label = dayjs(date).subtract(i, "day").format("MM-DD");
    arr.push(label);
  }
  return arr;
};
export {
  getAheadDateArr
};
