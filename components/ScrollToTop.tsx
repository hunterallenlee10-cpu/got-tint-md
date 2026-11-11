"use client";

import { useEffect } from "react";

/** Makes sure a page opened from a link (e.g. the footer "Contact") starts at the very top. */
export function ScrollToTop() {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return null;
}
