"use client";

import { useEffect } from "react";

export default function AdUnit({ slot }: { slot: string }) {
  useEffect(() => {
    if (!slot || slot.length < 5) return;
    try {
      ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
        (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
    } catch {}
  }, [slot]);

  if (!slot || slot.length < 5) return null;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4704944043310509"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
