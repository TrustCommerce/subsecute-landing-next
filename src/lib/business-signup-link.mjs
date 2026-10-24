/** Pass a signup prefill without placing an email in server request URLs. */
export function businessSignupLink(value) {
  const email = value.trim();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return null;
  const url = new URL("https://business.subsecute.com/signup");
  url.hash = new URLSearchParams({ email }).toString();
  return url.toString();
}
