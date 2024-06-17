import { INavigation, IPageConfig } from '@react-coolkit/layouts';
// import { getNavId } from '@react-cool-starter/selectors/common';

import { SignInPageConfig } from './auth';
import { DashboardPageConfig } from './dashboard';
import { DocumentsPageConfig } from './documents';
import { PageKey } from '../types';

export const pages: IPageConfig[] = [
	SignInPageConfig,
	DashboardPageConfig,
	DocumentsPageConfig,
];

const getNav = (prefix: string) => [
	{
		id: `${prefix}-dashboard`, // getNavId(PageKey.Home),
		label: 'Dashboard',
		Icon: <span>◉</span>,
		url: DashboardPageConfig.routes.find(({ id }) => id === PageKey.Home)
			?.path,
	},
	{
		id: `${prefix}-documents`, // getNavId(PageKey.Home),
		label: 'Documents',
		Icon: <span>◉</span>,
		url: DocumentsPageConfig.routes.find(({ id }) => id === PageKey.Documents)
			?.path,
	},
];

export const navigation: INavigation = {
	sideNav: getNav('sideNav'),
	// topNav: getNav('topnav'),
};
