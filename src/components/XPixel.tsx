"use client";

import Script from "next/script";
import { X_PIXEL_ID } from "@/config";

// X (Twitter) Ads base pixel. Renders nothing until NEXT_PUBLIC_X_PIXEL_ID is
// set, so local/preview builds don't ship a half-configured tag. Once the id is
// present this loads uwt.js and fires the automatic PageView; conversion events
// (e.g. Sign up) are fired separately from the form via window.twq(...).
export default function XPixel() {
  if (!X_PIXEL_ID) return null;

  return (
    <Script id="x-pixel" strategy="afterInteractive">
      {`
        !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
        },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
        a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
        twq('config','${X_PIXEL_ID}');
      `}
    </Script>
  );
}
