import { RouteObject } from 'react-router-dom';

import { IPageConfig, IPageLayout, IPageMetaData } from './';

export interface IRoute extends Omit<RouteObject, 'path'>, Pick<IPageConfig, 'accessControl'> {
	layout?: IPageLayout;
	metadata?: IPageMetaData;
	path: string;
	replace?: boolean;
}

export type KeyedRoute = Record<string, IRoute>;
