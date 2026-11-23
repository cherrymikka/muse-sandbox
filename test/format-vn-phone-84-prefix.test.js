import { test } from "node:test";
import assert from "node:assert/strict";
import { formatVnPhone } from "../src/format-vn-phone.js";

test("a 9-digit mobile number that starts with 84 is not a country code", () => {
  assert.equal(formatVnPhone("845678901"), "0845 678 901");
});

test("84 and +84 country codes still work for the same number", () => {
  assert.equal(formatVnPhone("84845678901"), "0845 678 901");
  assert.equal(formatVnPhone("+84845678901"), "0845 678 901");
});

test("84 country code works for landline numbers without a plus", () => {
  assert.equal(formatVnPhone("842838221234"), "028 3822 1234");
});
