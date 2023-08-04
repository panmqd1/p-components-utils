const toHex = (n) => `${n > 15 ? "" : 0}${n.toString(16)}`;
const toHexString = (colorObj) => {
  const { r, g, b, a = 1 } = colorObj;
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${a === 1 ? "" : toHex(Math.floor(a * 255))}`;
};
const toRgbString = (colorObj) => {
  const { r, g, b } = colorObj;
  return `rgb(${r},${g},${b})`;
};
const toRgbaString = (colorObj, n = 1e4) => {
  const { r, g, b, a = 1 } = colorObj;
  return `rgba(${r},${g},${b},${Math.floor(a * n) / n})`;
};
const parseHexColor = (color) => {
  let hex = color.slice(1);
  let a = 1;
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  if (hex.length === 8) {
    a = parseInt(hex.slice(6), 16) / 255;
    hex = hex.slice(0, 6);
  }
  const bigint = parseInt(hex, 16);
  return {
    r: bigint >> 16 & 255,
    g: bigint >> 8 & 255,
    b: bigint & 255,
    a
  };
};
const parseRgbaColor = (color) => {
  const arr = color.match(/(\d(\.\d+)?)+/g) || [];
  const res = arr.map((s) => parseInt(s, 10));
  return {
    r: res[0],
    g: res[1],
    b: res[2],
    a: parseFloat(arr[3])
  };
};
const parseColorString = (color) => {
  if (color.startsWith("#")) {
    return parseHexColor(color);
  } else if (color.startsWith("rgb")) {
    return parseRgbaColor(color);
  } else if (color === "transparent") {
    return parseHexColor("#00000000");
  }
  throw new Error(`color string error: ${color}`);
};
const getColorInfo = (color) => {
  const colorObj = parseColorString(color);
  const hex = toHexString(colorObj);
  const rgba = toRgbaString(colorObj);
  const rgb = toRgbString(colorObj);
  return {
    hex,
    rgba,
    rgb,
    rgbaObj: colorObj
  };
};
const hexToRgba = (hex) => {
  const colorObj = parseColorString(hex);
  return toRgbaString(colorObj);
};
const rgbaToHex = (rgba) => {
  const colorObj = parseColorString(rgba);
  return toHexString(colorObj);
};
export {
  getColorInfo,
  hexToRgba,
  parseColorString,
  parseHexColor,
  parseRgbaColor,
  rgbaToHex,
  toHex,
  toHexString,
  toRgbString,
  toRgbaString
};
