// Azure Static Web Apps picks Content-Type from the file extension. Next's
// static export writes OG images without one, so copy them to *.png;
// staticwebapp.config.json rewrites /<locale>/opengraph-image to that file.
import { copyFileSync, existsSync, readdirSync } from "node:fs";

if (existsSync("out")) {
  for (const entry of readdirSync("out", { withFileTypes: true })) {
    const src = `out/${entry.name}/opengraph-image`;
    if (entry.isDirectory() && existsSync(src)) copyFileSync(src, `${src}.png`);
  }
}
