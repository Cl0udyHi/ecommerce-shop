export function calcWidth(params: {
  container: HTMLElement | null;
  colsSize?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  gap: number;
}): number {
  const { container, colsSize, gap } = params;

  if (!container) return 0;

  const containerWidth = container.clientWidth || 0;
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;

  const breakpoints: [keyof NonNullable<typeof colsSize>, number][] = [
    ["sm", 640],
    ["md", 768],
    ["lg", 1024],
    ["xl", 1280],
    ["2xl", 1536],
  ];

  let cols = colsSize?.base ?? 1;

  for (const [key, minWidth] of breakpoints) {
    if (screenWidth >= minWidth) {
      cols = colsSize?.[key] ?? cols;
    }
  }

  return (containerWidth - gap * (cols - 1)) / cols;
}
