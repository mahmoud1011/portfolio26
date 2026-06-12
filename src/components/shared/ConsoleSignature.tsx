"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __ma_sig?: boolean;
  }
}

/**
 * One-time styled console signature. Invisible to recruiters; a handshake
 * to any engineer who opens devtools. Renders nothing, runs once.
 */
export function ConsoleSignature() {
  useEffect(() => {
    if (window.__ma_sig) return;
    window.__ma_sig = true;

    console.log(
      "%cSYS_CHECK ✓%c gameplay · ai · rendering · tools\n" +
        "%cReading the source? Good instinct. → mahmoudanwar75888@gmail.com",
      "color:#00D4AA;font-weight:bold;font-family:monospace;",
      "color:#9EA3B5;font-family:monospace;",
      "color:#5A6075;font-family:monospace;"
    );
  }, []);

  return null;
}
