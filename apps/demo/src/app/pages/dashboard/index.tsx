import { IPageConfig, LayoutStyle } from '@react-coolkit/layouts';

import Dashboard from './Dashboard';
import { appRoutes } from '../../config';
import { PageKey } from '../../types';

export const DashboardPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyle.Dashboard,
		config: {},
	},
	routes: [
		{
			id: PageKey.Home,
			caseSensitive: true,
			path: appRoutes.Home,
			metadata: {
				title: 'Dashboard Lorem',
			},
			element: <Dashboard />,
		},
	],
	accessControl: true,
};
