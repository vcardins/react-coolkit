
import { ReactNode } from 'react';

import { INavItem, Orientation } from '../../../../types';

export interface IMenuProps {
	nav: INavItem[] | ReactNode;
	orientation: Orientation;
	trigger?: 'hover' | 'click';
	allowOpenMultiple?: boolean;
}
