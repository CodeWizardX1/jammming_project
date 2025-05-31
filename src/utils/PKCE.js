// src/util/PKCE.js
import pkceChallenge from "pkce-challenge";

export function generatePKCE() {
  const { code_verifier, code_challenge } = pkceChallenge();
  sessionStorage.setItem("pkce_verifier", code_verifier);
  return code_challenge;
}
