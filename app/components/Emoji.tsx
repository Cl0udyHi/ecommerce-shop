"use client";

import { getTwemojiUrl } from "@/app/utils/parseTwemoji";
import Image from "next/image";

export default function FlagEmoji({
  emoji,
  size = 24,
}: {
  emoji: string;
  size?: number;
}) {
  const src = getTwemojiUrl(emoji);

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={emoji}
      width={size}
      height={size}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  );
}
