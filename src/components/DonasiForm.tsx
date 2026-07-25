"use client";

import { useState } from "react";
import { HandHeart, CheckCircle } from "@phosphor-icons/react";
import { donasiNominal, donasiPrograms } from "@/lib/content";

export function DonasiForm() {
  const [program, setProgram] = useState(donasiPrograms[0].slug);
  const [amount, setAmount] = useState<number | null>(250_000);
  const [custom, setCustom] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const effective = custom ? Number(custom.replace(/\D/g, "")) : amount;

  if (submitted) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-line bg-paper-raised p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-tint text-accent">
          <CheckCircle size={30} weight="fill" />
        </span>
        <h3 className="mt-5 font-serif text-[24px] font-semibold">Terima kasih 🤲</h3>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
          Niat baik Anda sebesar{" "}
          <strong className="text-ink">
            Rp{(effective || 0).toLocaleString("id-ID")}
          </strong>{" "}
          telah kami catat. Silakan selesaikan pembayaran melalui rekening di
          samping. Semoga menjadi amal jariyah.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[14px] font-semibold text-accent hover:underline"
        >
          Buat donasi lain
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-paper-raised p-6 md:p-7">
      <h3 className="font-serif text-[22px] font-semibold">Formulir Donasi</h3>

      {/* Program */}
      <label className="mt-6 block text-[13px] font-bold uppercase tracking-wide text-ink-soft">
        Pilih program
      </label>
      <div className="mt-2.5 flex flex-col gap-2">
        {donasiPrograms.map((p) => (
          <button
            key={p.slug}
            onClick={() => setProgram(p.slug)}
            className={`flex items-center justify-between rounded-[var(--radius)] border px-4 py-3 text-left text-[14px] font-medium transition-colors ${
              program === p.slug
                ? "border-accent bg-accent-tint text-ink"
                : "border-line text-ink-soft hover:border-line-strong"
            }`}
          >
            {p.title}
            {program === p.slug && (
              <CheckCircle size={18} weight="fill" className="text-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Nominal */}
      <label className="mt-6 block text-[13px] font-bold uppercase tracking-wide text-ink-soft">
        Nominal donasi
      </label>
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {donasiNominal.map((n) => (
          <button
            key={n}
            onClick={() => {
              setAmount(n);
              setCustom("");
            }}
            className={`rounded-[var(--radius)] border px-2 py-2.5 text-[13.5px] font-semibold transition-colors ${
              amount === n && !custom
                ? "border-accent bg-accent-tint text-accent"
                : "border-line text-ink-soft hover:border-line-strong"
            }`}
          >
            {n >= 1_000_000 ? `${n / 1_000_000} jt` : `${n / 1000}rb`}
          </button>
        ))}
      </div>
      <div className="mt-2.5 flex items-center rounded-[var(--radius)] border border-line px-3 focus-within:border-accent">
        <span className="text-[14px] font-semibold text-ink-faint">Rp</span>
        <input
          inputMode="numeric"
          placeholder="Nominal lain"
          value={custom ? Number(custom).toLocaleString("id-ID") : ""}
          onChange={(e) => {
            setCustom(e.target.value.replace(/\D/g, ""));
            setAmount(null);
          }}
          className="w-full bg-transparent px-2 py-2.5 text-[14px] text-ink outline-none placeholder:text-ink-faint"
        />
      </div>

      <button
        disabled={!effective}
        onClick={() => setSubmitted(true)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-[15px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        <HandHeart size={18} weight="fill" />
        Lanjutkan Donasi
        {effective ? ` · Rp${effective.toLocaleString("id-ID")}` : ""}
      </button>
      <p className="mt-3 text-center text-[12px] text-ink-faint">
        Simulasi antarmuka — belum terhubung ke payment gateway.
      </p>
    </div>
  );
}
