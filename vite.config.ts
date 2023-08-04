import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "/@": "/src",
    },
  },
  build: {
    target: "modules",
    outDir: "dist",
    minify: false,
    rollupOptions: {
      input: ['src/index.ts'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'es',
          preserveModulesRoot: 'src'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'lib',
          preserveModulesRoot: 'src'
        }
      ]
    },
    lib: {
      entry: "./index.ts",
      formats: ['es', 'cjs'],
      name: "p-components-utils",
    },
  },
  optimizeDeps: {
    include: ["lodash-es"],
  },
});
