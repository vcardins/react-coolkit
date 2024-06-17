import { CSSProperties, ReactNode } from 'react';

import { LayoutMode, LayoutStyle, ScrollOptions, ToolbarPositions } from './';

interface IComponentConfig {
	display: boolean;
	style: boolean;
	position: ToolbarPositions;
}

export type IToolbarConfig = IComponentConfig

export interface INavbarConfig extends Omit<IComponentConfig, 'style'> {
	folded: boolean;
}

export interface ILayoutConfig {
	backgroundColor?: CSSProperties['backgroundColor'];
	backgroundImage?: CSSProperties['backgroundImage'];
	contentProps?: {
		padding?: CSSProperties['padding'];
		overflow?: CSSProperties['overflow'];
	}
	footer?: ReactNode;
	header?: ReactNode;
	mode?: LayoutMode;
	navbar?: INavbarConfig;
	scroll?: ScrollOptions;
	scrollContent?: boolean;
	toolbar?: IToolbarConfig;
}

export interface IPageLayout {
	config?: ILayoutConfig;
	style?: LayoutStyle;
}
