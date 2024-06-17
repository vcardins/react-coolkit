import { MouseEvent, ReactElement } from 'react';

import { IBadge, NavItemType } from './';

export interface INavItem {
	badge?: IBadge;
	disabled?: boolean;
	hidden?: boolean;
	href?: string;
	Icon?: ReactElement;
	id: string;
	items?: INavItem[];
	label?: string;
	onClick?: (e: MouseEvent<HTMLElement>, item: INavItem) => void;
	order?: number;
	selected?: boolean;
	target?: string;
	tooltip?: string;
	type?: NavItemType;
	url?: string;
}

export interface ISubNavItem extends Omit<INavItem, 'items'> {
	items?: INavItem;
}
