import { CSSProperties } from 'react';

import { IRoute } from '../../../../types';

export interface IMainContentProps {
	overflow?: CSSProperties['overflow'];
	padding?: CSSProperties['padding'];
}

export interface IMainProps extends React.PropsWithChildren<any> {
	route: IRoute;
}
