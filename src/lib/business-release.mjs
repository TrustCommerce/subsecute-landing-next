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

/**
 * Released business pages are discoverable without a separate indexing flag.
 * @param {string | undefined} flag
 * @param {string | undefined} [_legacyIndexFlag] Ignored compatibility argument.
 */
export function businessIndexable(flag, _legacyIndexFlag = undefined) {
  void _legacyIndexFlag;
  return businessReleased(flag);
}

/**
 * Crawler files the business host serves for itself. They cannot come from the
 * consumer robots.ts or sitemap.ts: robots.txt is per-host, and serving the
 * consumer sitemap here would both leak consumer URLs onto this domain and
 * point crawlers at the wrong host. Each maps to its own route handler under
 * the /business segment, which is the only segment this host may read.
 */
const BUSINESS_CRAWLER_FILES = {
  "/robots.txt": "/business/robots.txt",
  "/sitemap.xml": "/business/sitemap.xml",
  "/llms.txt": "/business/llms.txt",
};

/** Metadata routes Next generates for the /business segment. */
function businessMetadataRoute(path) {
  return (
    path === "/business/opengraph-image" ||
    path.startsWith("/business/opengraph-image/") ||
    path === "/business/twitter-image" ||
    path.startsWith("/business/twitter-image/") ||
    Object.values(BUSINESS_CRAWLER_FILES).includes(path)
  );
}

/**
 * Where a "rewrite" action should land. The business root shows the landing;
 * the crawler files map to their own handlers.
 */
export function businessRewriteTarget(path) {
  return BUSINESS_CRAWLER_FILES[path] || "/business";
}

export function businessRouteAction(host, path, flag, mode, edgeMark) {
  const internal = path === "/business" || path.startsWith("/business/");
  const business = businessHost(host, edgeMark);
  if (!business && !internal) return "pass";
  if (!businessReleased(flag)) return "deny";
  if (business) {
    if (path === "/") return "rewrite";
    if (path === "/business") return "redirect";
    if (BUSINESS_CRAWLER_FILES[path]) return "rewrite";
    if (businessMetadataRoute(path)) return "pass";
    if (
      path.startsWith("/_next/") ||
      path.startsWith("/business-assets/") ||
      ["/favicon.ico", "/favicon.svg", "/favicon.png"].includes(path)
    )
      return "pass";
    return "deny";
  }
  if (!localBusinessPreview(host, mode)) return "deny";
  return path === "/business" || businessMetadataRoute(path) ? "pass" : "deny";
}
