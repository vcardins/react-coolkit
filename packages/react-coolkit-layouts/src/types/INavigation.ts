import { ReactNode } from 'react';

import { INavItem } from './INavItem';

export interface INavigation {
	sideNav?: (INavItem | ReactNode)[];
	topNav?: (INavItem | ReactNode)[];
}
