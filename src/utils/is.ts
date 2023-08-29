/**
 * 是否是数字类型
 * @param value
 * @returns
 */
export const isNumber = (value: unknown): boolean => {
  return typeof value === "number";
};

/**
 * 是否是NaN
 * @param value
 * @returns
 */
export const isNaN = (value: unknown): boolean => {
  return isNumber(value) && Number.isNaN(value);
};

/**
 * 是否是宽松数字类型, 即是数字或能转换成数字
 * @param value
 * @returns
 */
export const isSlackNumber = (value: unknown): boolean => {
  return isNumber(value) || isNumber(Number(value));
};

/**
 * 是否是严格数字类型, 即排除NaN和infinite
 * @param value
 * @returns
 */
export const isStrictNumber = (value: unknown): boolean => {
  return (
    isNumber(value) &&
    !isNaN(value) &&
    value !== Infinity &&
    value !== -Infinity
  );
};
