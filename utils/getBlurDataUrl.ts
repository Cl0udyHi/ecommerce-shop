import { getPlaiceholder } from "plaiceholder";

export async function getBlurDataUrl(src: string) {
  try {
    const { base64 } = await getPlaiceholder(src as any);
    return {
      src,
      blurDataURL: base64,
    };
  } catch (e) {
    console.error("Error generating blurDataURL:", e);
    return {
      src,
      blurDataURL: "",
    };
  }
}
