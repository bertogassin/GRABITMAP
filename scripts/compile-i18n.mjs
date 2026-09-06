import { compile } from "@inlang/paraglide-js";

const LOCALES = [
  "ru", "en", "fr", "es", "zh", "zh-TW", "hi", "ar", "pt", "de", "ja", "ko",
  "it", "tr", "pl", "uk", "nl", "vi", "id", "ms", "th", "fa", "ur", "bn",
  "pa", "sw", "el", "cs", "ro", "hu", "sv", "he",
];
const pathPattern = ":protocol://:domain(.*)::port?/:path(.*)?";

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
