import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'
import molcssPlugin from "molcss/vite-plugin"

export default defineConfig((options) => {
  return {
    plugins: [devtools(), solidPlugin(), molcssPlugin({
      content: 'src/**/*.{js,jsx,ts,tsx}',
    })],
    server: {
      port: 3000,
    },
    base: options.command === "build" ? "/unnamed-spinning-cube/" : "./",
    build: {
      outDir: "./docs"
    },
    assetsInclude: ["**/*.glb"]
    // root: "https://lilunderduck.github.io/random-ahh-website/dist"
  }
})
