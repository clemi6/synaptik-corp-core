import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

const port = 4173;
const outputDir = "pages";
const server = spawn("node", [".output/server/index.mjs"], {
  env: { ...process.env, HOST: "127.0.0.1", PORT: String(port) },
  stdio: "inherit",
});

const stopServer = () => server.kill();
process.on("exit", stopServer);
process.on("SIGINT", () => {
  stopServer();
  process.exit(130);
});

try {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  const response = await fetch(`http://127.0.0.1:${port}/`);
  if (!response.ok) throw new Error(`Unable to render the site: ${response.status}`);

  await mkdir(outputDir, { recursive: true });
  await cp(".output/public", outputDir, { recursive: true });
  let html = await response.text();
  html = html.replace(/(href|src)="\/(?!\/)/g, '$1="./');
  html = html.replaceAll('"/assets/', '"./assets/');
  html = html.replaceAll("'/assets/", "'./assets/");
  html = html.replaceAll("delete self.$_TSR,", "");
  await writeFile(`${outputDir}/index.html`, html);

  const headers = await readFile(`${outputDir}/_headers`, "utf8").catch(() => "");
  if (!headers) await writeFile(`${outputDir}/_headers`, "/*\n  X-Frame-Options: SAMEORIGIN\n");
} finally {
  stopServer();
}
