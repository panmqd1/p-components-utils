import dayjs, { Dayjs } from 'dayjs';

// 从某天(默认今天)开始, 往前创建x个日期
export const getAheadDateArr = (length: number, date: string | Dayjs): Array<string> => {
  const arr = [];
  for (let i = length - 1; i >= 0; i--) {
    const label = dayjs(date).subtract(i, 'day').format('MM-DD');
    arr.push(label);
  }
  return arr;
};
