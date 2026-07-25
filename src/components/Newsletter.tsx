"use client";

import { useState } from "react";
import { PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-accent/30 bg-accent-tint px-5 py-4 text-accent">
        <CheckCircle size={22} weight="fill" />
        <p className="text-sm font-medium">
          Terima kasih. Buletin pekanan akan dikirim ke kotak masuk Anda setiap Jumat pagi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <label htmlFor="nl-email" className="mb-2 block text-[13px] font-medium text-ink-soft">
        Alamat email
      </label>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          id="nl-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="nama@email.com"
          className="w-full rounded-full border border-line-strong bg-paper px-5 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent focus:ring-2 focus:ring-accent/25"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[14.5px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover active:scale-[0.98]"
        >
          Berlangganan <PaperPlaneTilt size={16} weight="bold" />
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-[13px] font-medium text-red-700 dark:text-red-400">
          Mohon masukkan alamat email yang valid.
        </p>
      )}
      <p className="mt-2.5 text-[12.5px] text-ink-faint">
        Ringkasan berita, kajian, dan naskah khutbah pilihan. Berhenti kapan saja.
      </p>
    </form>
  );
}
