import { describe, expect, it } from "vitest";
import { getSum } from "../es/index";

describe("对getSum函数进行测试", () => {
  it("should return 3 with [1,2,null]", () => {
    expect(getSum([1, 2, null])).toBe(3);
  });
  it("should return 23 with [1,22,'null']", () => {
    expect(getSum([1, 2232, "null"])).toBe(2233);
  });
  it("should return 0 with [undefined,NaN,null]", () => {
    expect(getSum([undefined, NaN, null, "NaN"])).toBe(0);
  });
});
