import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['bin/cli.ts'],
    format: ['cjs', 'esm'],
    outDir: 'dist',
    target: 'es5',
    treeshake: 'smallest',
    bundle: true,
    clean: true,
    minify: false,
    splitting: true,
    cjsInterop: true,
    legacyOutput: true,
});
