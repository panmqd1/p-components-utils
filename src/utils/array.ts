/**
 * 该函数的入参为一个泛型数组和一个属性名，返回值为切割后的多个数组，每个数组中的元素具有相同的属性值
 * @param arr
 * @param propName
 * @returns
 */
export function splitArrayByProperty<T>(arr: T[], propName: keyof T): T[][] {
  const result: T[][] = [];
  let temp: T[] = [];

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

/**
 * !!NOTE 分割数组的时候, 会将后一个子数组的第一个元素也包含进去
 * 该函数的入参为一个泛型数组和一个属性名，返回值为切割后的多个数组，每个数组中的元素具有相同的属性值
 * @param arr
 * @param propName
 * @returns
 */
export function splitArrayByPropertyExtraContainEle<T>(arr: T[], propName: keyof T): T[][] {
  const result: T[][] = [];
  const indexArr: number[] = [0]
  for (let i = 0; i < arr.length; i++) {
    if (i !== 0 && arr[i][propName] !== arr[i - 1][propName]) {
      indexArr.push(i);
    }
  }

  indexArr.forEach((item, index) => {
    const startIndex = item
    const endIndex = indexArr[index + 1] ? indexArr[index + 1] + 1 : undefined
    result.push(arr.slice(startIndex, endIndex))
  })

  return result;
}
