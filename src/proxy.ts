import { NextRequest, NextResponse } from "next/server";
import {
  BUSINESS_EDGE_HEADER,
  businessRouteAction,
  businessRewriteTarget,
} from "./lib/business-release.mjs";
export function proxy(request: NextRequest) {
  const action = businessRouteAction(
    request.headers.get("host"),
    request.nextUrl.pathname,
    process.env.BUSINESS_LANDING_ENABLED,
    process.env.NODE_ENV,
    request.headers.get(BUSINESS_EDGE_HEADER),
  );
  if (action === "deny")
    return new NextResponse("Not found", {
      status: 404,
      headers: {
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  if (action === "rewrite") {
    const url = request.nextUrl.clone();
    url.pathname = businessRewriteTarget(request.nextUrl.pathname);
    const response = NextResponse.rewrite(url);
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }
  if (action === "redirect") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 307);
  }
  return NextResponse.next();
}
export const config = { matcher: "/:path*" };
