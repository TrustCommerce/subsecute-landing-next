/**
 * The chat wallpaper behind the mockup.
 *
 * WhatsApp's own doodle wallpaper is Meta artwork, so it is not shipped here.
 * This is our own tile drawn in the same spirit: sparse outline glyphs at very
 * low contrast on the classic warm beige, tiled small enough to read as
 * texture rather than pattern.
 *
 * The glyphs are the things Subsecute actually pays for, which makes the
 * wallpaper ours rather than a copy: a play button, a card, a bulb, wifi, a
 * naira mark, a gift, a calendar, a cable box, a clock, headphones, a receipt,
 * a phone.
 */

/** WhatsApp's light chat background. The warm beige everyone recognises. */
export const WALLPAPER_BG = "#EFE7DE";

const TILE = `
<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
  <g fill="none" stroke="#54656F" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.055">
    <!-- play, streaming -->
    <rect x="14" y="16" width="25" height="25" rx="7"/>
    <path d="M24 24v9l7.5-4.5z" fill="#54656F" stroke="none"/>

    <!-- card -->
    <rect x="80" y="20" width="32" height="22" rx="4"/>
    <path d="M80 28h32"/>

    <!-- wifi, data -->
    <path d="M152 38a6.5 6.5 0 0 1 9 0M146.5 31.5a15 15 0 0 1 20 0M141 25a23 23 0 0 1 31 0"/>
    <circle cx="156.5" cy="42.5" r="1.5" fill="#54656F" stroke="none"/>

    <!-- bulb, power -->
    <path d="M35 76a9.5 9.5 0 1 0-11.5 0c1.5 1.2 1.9 2.5 1.9 4.2h7.7c0-1.7.4-3 1.9-4.2z"/>
    <path d="M25.5 85h7.5"/>

    <!-- naira -->
    <path d="M88 68v26M106 68v26M88 68l18 26M84 77h26M84 85h26"/>

    <!-- gift -->
    <rect x="146" y="78" width="26" height="19" rx="3"/>
    <path d="M146 84.5h26M159 78v19M159 78c-3.7-5.5-10.2-2.8-7.4 0zM159 78c3.7-5.5 10.2-2.8 7.4 0z"/>

    <!-- calendar -->
    <rect x="16" y="134" width="28" height="24" rx="4"/>
    <path d="M16 141.5h28M23.5 130v5.5M36.5 130v5.5"/>

    <!-- cable box, tv -->
    <rect x="82" y="130" width="32" height="22" rx="4"/>
    <path d="M91 160h14M98 152v8"/>

    <!-- clock, schedule -->
    <circle cx="158" cy="143" r="13"/>
    <path d="M158 135.5v8.3l5.5 2.8"/>

    <!-- headphones, music -->
    <path d="M29 190a11 11 0 0 1 22 0v9M29 190v9a3.7 3.7 0 0 0 7.4 0v-5.5a3.7 3.7 0 0 0-7.4 0M51 194a3.7 3.7 0 0 1 7.4 0v5.5a3.7 3.7 0 0 1-7.4 0"/>

    <!-- receipt -->
    <path d="M92 180h22v26l-3.7-2.8-3.7 2.8-3.7-2.8-3.7 2.8-3.7-2.8-3.5 2.8z"/>
    <path d="M97.5 187.5h11M97.5 194h11"/>

    <!-- phone -->
    <rect x="150" y="180" width="18" height="28" rx="4"/>
    <path d="M156.5 184h5"/>
  </g>
</svg>`;

export const WALLPAPER = `url("data:image/svg+xml,${encodeURIComponent(
  TILE.trim(),
)}")`;
