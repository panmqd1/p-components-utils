const regExps = {
  mobile: /^1(3|4|5|6|7|8|9)\d{9}$/,
  mobile2: /^1\d{10}$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  // 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
};

export const validPassword = (value: string) => {
  return regExps.password.test(value);
};

export default regExps;
