import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://skoleafhentning.embla.dk",
  integrations: [tailwind()],
});
