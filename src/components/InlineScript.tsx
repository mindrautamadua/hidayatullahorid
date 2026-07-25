// Runs an inline script synchronously during HTML parsing (before first
// paint) on hard loads, while avoiding React 19's dev warning about
// rendering <script> tags. Per Next.js "Preventing Flash Before Hydration":
// server renders it as executable JS; on the client it renders as inert
// text/plain, and suppressHydrationWarning accepts the type mismatch.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
