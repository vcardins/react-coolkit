import { BrowserRouter as Router } from 'react-router-dom';

import { createRoot } from 'react-dom/client';

import { App as BaseApp } from './app/App';
import { makeServer } from './mirage';

const environment = process.env['NODE_ENV'];

if (environment !== 'production') {
	makeServer({ environment });
}

const basename = import.meta.env['basename'] ?? process.env['basename'] ?? '';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<Router basename={basename}>
		<BaseApp />
	</Router>,
);
