export type PathRawName = "/" | "/settings";

export type PathType = "main" | "settings";

export const PathMap: Readonly<Record<PathRawName, PathType>> = {
  "/": "main",
  "/settings": "settings",
};
