function normalizeBase(baseUrl) {
  const value = baseUrl || "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}${value === "/" ? "" : "/"}`;
}

function isPassthroughUrl(value) {
  return /^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(value);
}

export function createSitePaths(baseUrl = "/") {
  const base = normalizeBase(baseUrl);
  const basePath = base === "/" ? "" : base.slice(0, -1);

  return {
    href(value) {
      if (!value.startsWith("/") || isPassthroughUrl(value)) return value;
      return `${base}${value.slice(1)}`;
    },
    asset(filename) {
      return `${base}assets/${filename.replace(/^\/+/, "")}`;
    },
    route(pathname) {
      const withoutBase = basePath && pathname.startsWith(basePath)
        ? pathname.slice(basePath.length)
        : pathname;
      return withoutBase.replace(/\/+$/, "") || "/";
    },
  };
}

export const sitePaths = createSitePaths(import.meta.env?.BASE_URL ?? "/");
