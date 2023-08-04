const keysOf = (obj) => {
  return Object.keys(obj);
};
const setObjectValueFromData = (obj, data) => {
  for (const key of keysOf(obj)) {
    obj[key] = data == null ? void 0 : data[key];
  }
};
export {
  keysOf,
  setObjectValueFromData
};
