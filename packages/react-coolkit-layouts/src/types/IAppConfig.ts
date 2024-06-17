import { ReactNode } from 'react';

import { SerializedStyles } from '@emotion/react';

import { IMetadata, INavigation, IPageConfig, ISettings, ITheme, Subset } from './';

export interface IProvidersProps {
	navigation?: INavigation;
	children: (navigation?: INavigation) => ReactNode;
}

export interface IAppConfig {
	container?: string;
	basename?: string;
	strictMode?: boolean;
	theme: ITheme;
	styles?: SerializedStyles;
	metadata: IMetadata;
	navigation?: INavigation;
	settings?: Subset<ISettings>;
	pages: IPageConfig[];
	App?: () => ReactNode;
}
