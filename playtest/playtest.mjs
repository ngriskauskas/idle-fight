// Bundles the headless harness with esbuild (React swapped for a tiny shim) and runs it.
import { build } from "esbuild";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const shim = join(here, "harness", "reactShim.ts");
const outfile = join(here, ".build", "cli.mjs");

await build({
  entryPoints: [join(here, "harness", "cli.ts")],
  outfile,
  bundle: true,
  platform: "node",
  format: "esm",
  logLevel: "error",
  alias: {
    react: shim,
    "use-sync-external-store/shim/with-selector.js": shim,
  },
  define: { "import.meta.env": "undefined" },
});

const result = spawnSync(process.execPath, [outfile, ...process.argv.slice(2)], { stdio: "inherit" });
process.exit(result.status ?? 1);
