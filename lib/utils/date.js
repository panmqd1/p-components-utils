"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const dayjs_min = require("../node_modules/dayjs/dayjs.min.js");
const getAheadDateArr = (length, date) => {
  const arr = [];
  for (let i = length - 1; i >= 0; i--) {
    const label = dayjs_min(date).subtract(i, "day").format("MM-DD");
    arr.push(label);
  }
  return arr;
};
exports.getAheadDateArr = getAheadDateArr;
