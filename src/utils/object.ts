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

/**
 * 从props配置中获取默认值
 * @param props
 * @param overrideProps
 * @returns
 */
export function getDefaultFromProps<T = Record<string, any>>(
  props: Record<string, any>,
  overrideProps: T
): T | Record<string, any> {
  const defaults = Object.entries(props).reduce((temp, [key, value]) => {
    temp[key] = value?.default;
    return temp;
  }, {} as any);
  return {
    ...defaults,
    ...overrideProps,
  };
}
