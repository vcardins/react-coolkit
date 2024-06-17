import { CSSProperties } from 'react';

import { ILoadingProps } from '../Loading';

export interface ISplashScreenProps extends ILoadingProps  {
	color?: CSSProperties['color'];
	delay?: number;
	id?: string;
	Logo?: JSX.Element;
	message?: string;
	offset?: CSSProperties['offset'];
	opacity?: number;
}
