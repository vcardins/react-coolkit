import { ReactElement, ReactNode } from 'react';

import { IAppConfig, IRoute } from './';

export interface IRoutingContextProps extends Pick<IAppConfig, 'pages'> {
	children?: ReactNode;
	documentTitle: string;
	isAuthorized?: () => boolean;
	SplashScreen?: () => ReactElement;
}

export interface IRoutingContext {
	activeRoute: IRoute;
	navigate: (to: string) => void;
	renderedRoutes: ReactNode;
}
