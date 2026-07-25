"use client";

import { useState } from "react";
import {
  ShareNetwork,
  FacebookLogo,
  XLogo,
  WhatsappLogo,
  LinkSimple,
  Check,
} from "@phosphor-icons/react";

export function ShareBar({ title, vertical = false }: { title: string; vertical?: boolean }) {
  const [copied, setCopied] = useState(false);

  const currentUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const nativeShare = async () => {
    const url = currentUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* user dismissed */
      }
    } else {
      copy();
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  const open = (build: (url: string, t: string) => string) => {
    const href = build(encodeURIComponent(currentUrl()), encodeURIComponent(title));
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=520");
  };

  const btn =
    "grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent active:scale-95";

  return (
    <div className={vertical ? "flex flex-col items-start gap-2" : "flex items-center gap-2"}>
      <button onClick={nativeShare} aria-label="Bagikan" className={btn}>
        <ShareNetwork size={16} weight="bold" />
      </button>
      <button
        onClick={() => open((u, t) => `https://wa.me/?text=${t}%20${u}`)}
        aria-label="Bagikan ke WhatsApp"
        className={btn}
      >
        <WhatsappLogo size={16} weight="fill" />
      </button>
      <button
        onClick={() => open((u) => `https://www.facebook.com/sharer/sharer.php?u=${u}`)}
        aria-label="Bagikan ke Facebook"
        className={btn}
      >
        <FacebookLogo size={16} weight="fill" />
      </button>
      <button
        onClick={() => open((u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}`)}
        aria-label="Bagikan ke X"
        className={btn}
      >
        <XLogo size={16} weight="fill" />
      </button>
      <button onClick={copy} aria-label="Salin tautan" className={btn}>
        {copied ? <Check size={16} weight="bold" className="text-accent" /> : <LinkSimple size={16} weight="bold" />}
      </button>
    </div>
  );
}
