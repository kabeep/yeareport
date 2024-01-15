import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    outDir: 'lib',
    target: 'es5',
    treeshake: 'smallest',
    bundle: true,
    clean: true,
    minify: false,
    splitting: true,
    cjsInterop: true,
    legacyOutput: true,
});
