export const keysOf = <T extends object>(obj: T) => {
  return Object.keys(obj) as (keyof T)[];
};

/**
 * 
 * @param obj 需要被赋值的对象
 * @param data 数据来源对象
 */
export const setObjectValueFromData = <T extends object>(obj: T, data: any) => {
  for (const key of keysOf(obj)) {
    obj[key] = data?.[key];
  }
};
