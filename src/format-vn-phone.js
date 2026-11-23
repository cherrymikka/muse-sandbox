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
  if (typeof input !== "string") {
    return null;
  }

  // Remove spaces, dots, dashes and parentheses.
  const cleaned = input.replace(/[\s.()-]/g, "");

  if (cleaned === "") {
    return null;
  }

  let digits = cleaned;

  if (digits.startsWith("+")) {
    // Only the Vietnamese country code is accepted after "+".
    const rest = digits.slice(1);
    if (!rest.startsWith("84")) {
      return null;
    }
    digits = `0${rest.slice(2)}`;
  } else if (
    digits.startsWith("84") &&
    (digits.length === 11 || digits.length === 12)
  ) {
    // Without a "+", "84" is a country code only when what follows it
    // can form a valid number: 84 + 9 digits = mobile, 84 + 10 = landline.
    // A 9-digit input such as "845678901" is not international — it is a
    // national number missing its leading 0 ("0845678901"), so it must
    // fall through to the 9-digit case below instead.
    digits = `0${digits.slice(2)}`;
  }

  // Anything left that is not a digit makes the input invalid.
  if (!/^\d+$/.test(digits)) {
    return null;
  }

  // A 9-digit number is missing its leading 0.
  if (digits.length === 9) {
    digits = `0${digits}`;
  }

  // Valid mobile: 10 digits starting with 03, 05, 07, 08 or 09.
  if (digits.length === 10 && /^(03|05|07|08|09)/.test(digits)) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  // Valid landline: 11 digits starting with 02.
  if (digits.length === 11 && digits.startsWith("02")) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }

  return null;
}
