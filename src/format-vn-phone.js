/**
 * Normalize and format a Vietnamese phone number.
 *
 * Rules:
 *  - Remove spaces, dots, dashes and parentheses.
 *  - "+84..." or "84..." prefix becomes a leading "0".
 *  - A 9-digit number that is missing the leading 0 gets a "0" added.
 *  - Valid mobile: 10 digits starting with 03, 05, 07, 08 or 09.
 *  - Valid landline: 11 digits starting with 02.
 *  - Anything else is invalid.
 *
 * Output:
 *  - Mobile:   "0383 470 265"   (4-3-3)
 *  - Landline: "028 3822 1234"  (3-4-4)
 *  - Invalid input returns null.
 *
 * @param {unknown} input
 * @returns {string | null}
 */
export function formatVnPhone(input) {
  throw new Error("Not implemented");
}
