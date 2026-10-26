import type { Metadata } from "next";

/**
 * The canonical URL for a path, plus the hreflang set that goes with it.
 *
 * There is one English edition of this site and it is served worldwide. Left
 * to speak for itself it reads as Nigeria-local -- `<html lang="en-NG">` and
 * `og:locale: en_NG` both say so -- and roughly half the audience asks these
 * questions from the UK, the US, Canada and the Gulf. A self-referencing `en`
 * alongside `x-default` tells a search engine that this same document is the
 * one to serve any English speaker, without claiming translations that do not
 * exist.
 *
 * Every page sets its own `alternates`, which replaces the parent's rather
 * than merging into it, so each page has to call this instead of inheriting.
 */
export function alternatesFor(path: string): Metadata["alternates"] {
  return {
    canonical: path,
    languages: { en: path, "x-default": path },
  };
}
