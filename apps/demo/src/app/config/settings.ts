import { ISettings, Subset } from '@react-coolkit/layouts';

import manifest from '../../manifest.json';

export const settings: Subset<ISettings> = {
	header: {
		elevation: 2,
	},
	sideNav: {
		width: {
			collapsed: '55px',
			expanded: '250px',
		},
	},
	colors: {
		primary: manifest.theme_color,
		secondary: '#78577d',
	},
};
