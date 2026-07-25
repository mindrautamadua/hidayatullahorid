"use client";

import { useEffect } from "react";

/**
 * Registers the PWA service worker once the page has loaded.
 * Kept out of the critical path so it never blocks first paint.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // In development the SW only causes grief: it serves stale HTML that then
    // fails to hydrate against freshly-built JS. Actively unregister any SW and
    // purge its caches so the dev browser self-heals instead of showing an old
    // page. Registration is production-only.
    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister());
      });
      if ("caches" in window) {
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
      }
      return;
    }

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => console.error("SW registration failed:", err));
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
