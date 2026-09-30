import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

export default defineConfig(() => {
  return {
    plugins: [devtools(), solidPlugin()],
    server: {
      port: 3000,
    },
    // root: "https://lilunderduck.github.io/random-ahh-website/dist"
  }
})
