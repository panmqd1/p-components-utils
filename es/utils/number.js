function convertToThousands_v1(num, toFixed, returnSame) {
  if (typeof num === "string") {
    const parsedNum = Number(num);
    if (isNaN(parsedNum) || !isFinite(parsedNum)) {
      return returnSame ? num : "";
    }
    num = parsedNum;
  } else if (!isFinite(num)) {
    return returnSame ? "" : "";
  } else if (!num && num !== 0) {
    return returnSame ? "" : "";
  }
  const isNegative = num < 0;
  num = Math.abs(num);
  const numStr = typeof toFixed === "number" ? num.toFixed(toFixed) : String(num);
  const parts = numStr.split(".");
  const integerPart = parts[0];
  let result = "";
  for (let i = integerPart.length - 1, j = 0; i >= 0; i--, j++) {
    result = integerPart.charAt(i) + result;
    if ((j + 1) % 3 === 0 && j + 1 !== integerPart.length) {
      result = "," + result;
    }
  }
  if (parts.length === 2) {
    result = result + "." + parts[1];
  }
  if (isNegative) {
    result = "-" + result;
  }
  return result;
}
const convertToThousands = (num, toFixed, returnSame, extraOptions) => {
  if (typeof num !== "number" && typeof num !== "string") {
    return returnSame ? num : "";
  }
  if (typeof num === "number" && isNaN(num)) {
    return returnSame ? num : "";
  }
  if (typeof num === "string") {
    const parsedNum = Number(num);
    if (isNaN(parsedNum) || !parsedNum && parsedNum !== 0) {
      return returnSame ? num : "";
    }
    num = parsedNum;
  }
  const maximumFractionDigits = typeof toFixed === "number" ? toFixed : void 0;
  const options = {
    // 最多保留x位小数
    maximumFractionDigits,
    ...extraOptions || {}
  };
  return num.toLocaleString("en-US", options);
};
const convertToValidNumberOrNaN = (num) => {
  if (typeof num === "number") {
    return num;
  }
  if (typeof num === "string" && num !== "") {
    const parsedNum = Number(num);
    if (isNaN(parsedNum) || !isFinite(parsedNum)) {
      return NaN;
    }
    return parsedNum;
  }
  return NaN;
};
const formatNumberToThousandsUnitStrOrPlaceholder = (num, unit = "", placeholder = "-") => {
  const newNum = convertToValidNumberOrNaN(num);
  const str = convertToThousands(newNum);
  return str ? `${str}${unit}` : placeholder;
};
const formatNumberToNumberUnitStrOrPlaceholder = (num, unit = "", placeholder = "-", toFixed) => {
  const data = convertToValidNumberOrNaN(num);
  const fixedNumber = typeof toFixed === "number" ? data.toFixed(toFixed) : data;
  return isNaN(data) ? placeholder : `${fixedNumber}${unit}`;
};
const convertToValidPercentStrOrEmpty = (num, toFixed, ratio) => {
  const proportion = convertToValidNumberOrNaN(num);
  if (!proportion && proportion !== 0 || proportion === Infinity) {
    return "";
  }
  ratio = ratio ?? 1;
  const percent = proportion * ratio;
  const fixedPercent = typeof toFixed === "number" ? percent.toFixed(toFixed) : percent;
  return `${fixedPercent}%`;
};
const getGcd = (x, y) => {
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
};
const isGreaterThanZero = (num, includeZero = false) => {
  const newNum = convertToValidNumberOrNaN(num);
  const flag = includeZero ? newNum >= 0 : newNum > 0;
  return !!newNum && flag;
};
const isLessThanZero = (num, includeZero = false) => {
  const newNum = convertToValidNumberOrNaN(num);
  const flag = includeZero ? newNum <= 0 : newNum < 0;
  return !!newNum && flag;
};
const getSum = (nums) => {
  let sum = 0;
  nums.forEach((num) => {
    const newNum = convertToValidNumberOrNaN(num) || 0;
    sum += newNum;
  });
  return sum;
};
const getAvg = (nums) => {
  const sum = getSum(nums);
  return sum / nums.length;
};
const getMinAndMax = (nums) => {
  const numberArr = nums.map(convertToValidNumberOrNaN);
  const arr = numberArr.filter((item) => !!item);
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  return {
    numberArr,
    max: [-Infinity, Infinity].includes(max) ? NaN : max,
    min: [-Infinity, Infinity].includes(min) ? NaN : min
  };
};
export {
  convertToThousands,
  convertToThousands_v1,
  convertToValidNumberOrNaN,
  convertToValidPercentStrOrEmpty,
  formatNumberToNumberUnitStrOrPlaceholder,
  formatNumberToThousandsUnitStrOrPlaceholder,
  getAvg,
  getGcd,
  getMinAndMax,
  getSum,
  isGreaterThanZero,
  isLessThanZero
};
