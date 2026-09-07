import { compile } from "@inlang/paraglide-js";
import { readFile } from "node:fs/promises";

const LOCALES = [
  "ru", "en", "fr", "es", "zh", "zh-TW", "hi", "ar", "pt", "de", "ja", "ko",
  "it", "tr", "pl", "uk", "nl", "vi", "id", "ms", "th", "fa", "ur", "bn",
  "pa", "sw", "el", "cs", "ro", "hu", "sv", "he",
];
const pathPattern = ":protocol://:domain(.*)::port?/:path(.*)?";

const settings = JSON.parse(
  await readFile(new URL("../project.inlang/settings.json", import.meta.url), "utf8"),
);
const configuredLocales = settings.locales || [];
if (
  configuredLocales.length !== LOCALES.length ||
  LOCALES.some((locale) => !configuredLocales.includes(locale))
) {
  throw new Error("project.inlang/settings.json must contain exactly the 32 supported locales");
}

await compile({
  project: "./project.inlang",
  outdir: "./static/paraglide",
  strategy: ["cookie", "preferredLanguage", "baseLocale"],
  cookieName: "resursmap_lang",
  outputStructure: "locale-modules",
  urlPatterns: [
    {
      pattern: pathPattern,
      localized: LOCALES.map((locale) => [locale, pathPattern]),
    },
  ],
});

console.log("Paraglide compiled");
