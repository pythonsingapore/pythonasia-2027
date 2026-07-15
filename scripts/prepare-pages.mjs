import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const ROUTES = ["schedule", "speakers", "coc"];

export async function preparePages(distDir) {
  const indexPath = join(distDir, "index.html");
  const html = await readFile(indexPath, "utf8");

  for (const route of ROUTES) {
    const routeDir = join(distDir, route);
    await mkdir(routeDir, { recursive: true });
    await writeFile(join(routeDir, "index.html"), html);
  }

  await writeFile(join(distDir, "404.html"), html);
}

const isMain = process.argv[1]
  && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  await preparePages(resolve(dirname(fileURLToPath(import.meta.url)), "../dist"));
}
