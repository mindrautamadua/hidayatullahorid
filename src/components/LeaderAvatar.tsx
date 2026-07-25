"use client";

import Image from "next/image";
import { useState } from "react";

function initials(name: string) {
  return name
    .replace(/^(Dr|Ir|KH|Ust)\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export function LeaderAvatar({
  name,
  photo,
}: {
  name: string;
  photo?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showPhoto = photo && !failed;

  return (
    <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-accent font-serif text-[18px] font-semibold text-accent-ink">
      {showPhoto ? (
        <Image
          src={photo}
          alt={name}
          fill
          sizes="56px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        initials(name)
      )}
    </span>
  );
}
