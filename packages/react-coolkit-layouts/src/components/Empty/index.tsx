import { Suspense } from 'react';

import { ILayoutProps } from '../../types';
import { Background } from '../Background';
import { LinearProgress } from '../Progress';


export const EmptyLayout = ({ renderedRoutes, activeRoute }: ILayoutProps) => (
	<Background {...activeRoute.layout?.config}>
		<Suspense fallback={<LinearProgress />}>
			{renderedRoutes}
		</Suspense>
	</Background>
);
