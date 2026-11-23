import { test } from "node:test";
import assert from "node:assert/strict";
import { formatVnPhone } from "../src/format-vn-phone.js";

test("formats a 10-digit mobile number", () => {
  assert.equal(formatVnPhone("0383470265"), "0383 470 265");
});

test("removes spaces, dots, dashes and parentheses", () => {
  assert.equal(formatVnPhone("0383 470 265"), "0383 470 265");
  assert.equal(formatVnPhone("0383.470.265"), "0383 470 265");
  assert.equal(formatVnPhone("0383-470-265"), "0383 470 265");
  assert.equal(formatVnPhone("(0383) 470 265"), "0383 470 265");
});

test("converts +84 and 84 prefixes to a leading 0", () => {
  assert.equal(formatVnPhone("+84383470265"), "0383 470 265");
  assert.equal(formatVnPhone("84383470265"), "0383 470 265");
  assert.equal(formatVnPhone("+84 383 470 265"), "0383 470 265");
});

test("adds the missing leading 0 to a 9-digit mobile number", () => {
  assert.equal(formatVnPhone("383470265"), "0383 470 265");
});

test("accepts all valid mobile prefixes", () => {
  for (const prefix of ["03", "05", "07", "08", "09"]) {
    const raw = `${prefix}12345678`;
    assert.equal(formatVnPhone(raw), `${raw.slice(0, 4)} ${raw.slice(4, 7)} ${raw.slice(7)}`);
  }
});

test("formats an 11-digit landline number as 3-4-4", () => {
  assert.equal(formatVnPhone("02838221234"), "028 3822 1234");
  assert.equal(formatVnPhone("+842838221234"), "028 3822 1234");
});

test("rejects invalid prefixes", () => {
  assert.equal(formatVnPhone("0183470265"), null);
  assert.equal(formatVnPhone("0283470265"), null); // landline prefix but only 10 digits
});

test("rejects wrong lengths", () => {
  assert.equal(formatVnPhone("038347026"), null);
  assert.equal(formatVnPhone("03834702655"), null);
  assert.equal(formatVnPhone("123"), null);
});

test("rejects empty, non-string and non-numeric input", () => {
  assert.equal(formatVnPhone(""), null);
  assert.equal(formatVnPhone("   "), null);
  assert.equal(formatVnPhone(null), null);
  assert.equal(formatVnPhone(undefined), null);
  assert.equal(formatVnPhone(383470265), null);
  assert.equal(formatVnPhone("abc"), null);
  assert.equal(formatVnPhone("0383abc265"), null);
});
