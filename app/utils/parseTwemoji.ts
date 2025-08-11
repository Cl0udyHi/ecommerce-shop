import twemoji from "twemoji";

export function parseTwemoji(emoji: string): string {
  return twemoji.parse(emoji, {
    folder: "svg",
    ext: ".svg",
    base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/",
  });
}

export function getTwemojiUrl(emoji: string): string {
  return (
    twemoji
      .parse(emoji, {
        folder: "svg",
        ext: ".svg",
        base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/",
      })
      ?.match(/src="([^"]+)"/)?.[1] ?? ""
  );
}
