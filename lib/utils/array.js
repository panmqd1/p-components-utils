"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
function splitArrayByProperty(arr, propName) {
  const result = [];
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === 0 || arr[i][propName] === arr[i - 1][propName]) {
      temp.push(arr[i]);
    } else {
      result.push(temp);
      temp = [arr[i]];
    }
  }
  if (temp.length > 0) {
    result.push(temp);
  }
  return result;
}
function splitArrayByPropertyExtraContainEle(arr, propName) {
  const result = [];
  const indexArr = [0];
  for (let i = 0; i < arr.length; i++) {
    if (i !== 0 && arr[i][propName] !== arr[i - 1][propName]) {
      indexArr.push(i);
    }
  }
  indexArr.forEach((item, index) => {
    const startIndex = item;
    const endIndex = indexArr[index + 1] ? indexArr[index + 1] + 1 : void 0;
    result.push(arr.slice(startIndex, endIndex));
  });
  return result;
}
exports.splitArrayByProperty = splitArrayByProperty;
exports.splitArrayByPropertyExtraContainEle = splitArrayByPropertyExtraContainEle;
