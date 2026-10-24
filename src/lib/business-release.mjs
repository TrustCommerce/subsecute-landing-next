export const BUSINESS_HOST = "business.subsecute.com";
export function businessReleased(value) {
  return value === "true";
}
// CloudFront serves business.subsecute.com from this site but does not pass the visitor's
// Host header on; Netlify sees its own default name. The distribution marks those requests
// with this header instead, so the business host is either the name itself or the mark.
export const BUSINESS_EDGE_HEADER = "x-subsecute-business";
export function businessHost(host, edgeMark) {
  if (edgeMark === "1") return true;
  return (host || "").toLowerCase().split(":")[0] === BUSINESS_HOST;
}
export function localBusinessPreview(host, mode) {
  return (
    mode === "development" &&
    ["localhost", "127.0.0.1"].includes((host || "").split(":")[0])
  );
}
export function businessRouteAction(host, path, flag, mode, edgeMark) {
  const internal = path === "/business" || path.startsWith("/business/");
  const business = businessHost(host, edgeMark);
  if (!business && !internal) return "pass";
  if (!businessReleased(flag)) return "deny";
  if (business) {
    if (path === "/") return "rewrite";
    if (path === "/business") return "redirect";
    if (
      path.startsWith("/_next/") ||
      path.startsWith("/business-assets/") ||
      ["/favicon.ico", "/favicon.svg", "/favicon.png"].includes(path)
    )
      return "pass";
    return "deny";
  }
  return localBusinessPreview(host, mode) && path === "/business"
    ? "pass"
    : "deny";
}
