import { readdirSync, readFileSync, writeFileSync, copyFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const iconsDir = join(rootDir, "node_modules/iconoir/icons/regular");
const cssSource = join(rootDir, "node_modules/iconoir/css/iconoir.css");

console.log("Updating Iconoir icons...\n");

const iconNames = readdirSync(iconsDir)
  .filter((f) => f.endsWith(".svg"))
  .map((f) => f.replace(".svg", ""))
  .sort();

console.log(`Found ${iconNames.length} icons`);

const tsContent = `export const iconoirNames: string[] = [
${iconNames.map((name) => `  "${name}",`).join("\n")}
];

export const iconoir: Record<string, string> = Object.fromEntries(
  iconoirNames.map(name => [name, \`iconoir-\${name}\`])
);
`;

writeFileSync(join(rootDir, "src/iconoirNames.ts"), tsContent);
console.log("Updated src/iconoirNames.ts");

const cssContent = readFileSync(cssSource, "utf-8");
const pluginCss = `
/* Plugin-specific styles */
.iconoir-icon-element {
  display: inline-flex;
  vertical-align: middle;
}

.iconoir-icon-inner {
  display: block;
  mask-size: cover;
  -webkit-mask-size: cover;
  background: var(--iconoir-stroke, currentColor);
  width: var(--iconoir-width, 1.2em);
  height: var(--iconoir-height, 1.2em);
}

.icon-suggester-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.iconoir-icon-name {
  font-family: var(--font-monospace);
}
`;

writeFileSync(join(rootDir, "styles.css"), cssContent + pluginCss);
console.log("Updated styles.css");

console.log("\nDone!");
