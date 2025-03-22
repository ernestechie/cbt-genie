import crypto from "crypto";

export function generateSecureOTP() {
  // Generate cryptographically secure random number
  const array = new Uint32Array(1);
  crypto.randomFillSync(array);

  // Ensure 6-digit format without modulo bias
  return ((array[0] % 900000) + 100000).toString();
}
