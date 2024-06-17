import { Dispatch, ReactNode, SetStateAction } from 'react';

import { SerializedStyles } from '@emotion/react';

import { IAppConfig, INavigation, IRoute, IRoutingContext, ISettings, Subset } from './';

export interface IAppLayoutProps extends Pick<IAppConfig, 'navigation' | 'metadata' | 'settings'> {
	children?: ReactNode;
	styles?: SerializedStyles;
	components?: {
		header?: ReactNode;
		footer?: ReactNode;
		sideBar?: {
			header?: ReactNode;
			menu?: ReactNode;
			footer?: ReactNode;
		};
	};
	ids?: {
		title?: string;
		subTitle?: string;
		icon?: string;
	};
	sidenavActive?: boolean;
	onSignOut?: () => Promise<void>;
}

export interface ILayoutProps {
	id: string;
	activeRoute: IRoute;
	renderedRoutes: ReactNode;
}

export interface IAppLayoutContext extends Omit<IAppLayoutProps, 'name' | 'theme' | 'settings'>, ILayoutProps {
	settings: ISettings;
	profile?: ReactNode;
	smallScreen: boolean;
	fixedSidenav: boolean;
	toggleSidenav: () => void;
	updateProfile?: Dispatch<SetStateAction<ReactNode | undefined>>
	navigate: IRoutingContext['navigate'];
	updateNavigation: (value: Subset<INavigation>) => void;
	updateSettings: (value: Subset<ISettings>) => void;
}
