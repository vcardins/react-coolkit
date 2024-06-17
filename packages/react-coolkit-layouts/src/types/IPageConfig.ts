import { IPageLayout, IRoute } from './';

export interface IPageConfig {
	accessControl?: (string | number)[] | boolean;
	routes: IRoute[];
	layout?: IPageLayout;
}
