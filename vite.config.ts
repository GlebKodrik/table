import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({ include: '**/*.svg' }),
    visualizer({
      template: 'treemap',
      gzipSize: true,
      filename: 'analyse.html',
    }) as PluginOption,
    EnvironmentPlugin('all'),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    port: 3007,
    open: true,
    strictPort: true,
  },
  envPrefix: 'REACT_',
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  build: {
    outDir: 'dist',
  },
});
