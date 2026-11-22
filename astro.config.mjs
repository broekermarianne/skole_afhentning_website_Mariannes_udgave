import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://broekermarianne.github.io",
  base: "/skole_afhentning_website_Mariannes_udgave",
  integrations: [tailwind()],
});
