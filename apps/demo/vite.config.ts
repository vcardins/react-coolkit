/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const host = 'localhost';

const config = {
	cacheDir: '../../node_modules/.vite/apps/demo',

	server: {
		port: 4300,
		host,
	},

	define: {
		'process.env': {},
	},

	preview: {
		port: 4300,
		host,
	},

	plugins: [
		react(),
		tsconfigPaths(),
	],

	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ tsconfigPaths() ],
	// },

	test: {
		globals: true,
		cache: {
			dir: '../../node_modules/.vitest',
		},
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
};

export default ({ mode }: { mode: string }) => {
	// Load app-level env vars to node-level env vars.
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig(config);
};
