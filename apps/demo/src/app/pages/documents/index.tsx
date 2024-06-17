import { IPageConfig, LayoutStyle } from '@react-coolkit/layouts';

import Documents from './Documents';
import { appRoutes } from '../../config';
import { PageKey } from '../../types';

export const DocumentsPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyle.Dashboard,
		config: {},
	},
	routes: [
		{
			id: PageKey.Documents,
			caseSensitive: true,
			path: appRoutes.Documents,
			metadata: {
				title: 'Documents',
			},
			element: <Documents />,
		},
	],
	accessControl: true,
};
