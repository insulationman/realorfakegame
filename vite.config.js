import { defineConfig } from "vite";

export default defineConfig({
  //set assetsInclude to include the file types you want to import

  // Define `base` because this deploys to user.github.io/repo-name/
  base: "./",
  build: {
    assetsInlineLimit: 0,
  },
});
