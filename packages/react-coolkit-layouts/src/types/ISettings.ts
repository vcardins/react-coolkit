import { CSSProperties } from 'react';

import { PageTransition, Positioning, SidenavMode } from './';

interface INavigationSettings {
	elevation?: number;
	fontSize: CSSProperties['fontSize'];
	gap?: CSSProperties['gap'];
	iconPositioning: Positioning;
	menuTrigger?: 'click' | 'hover';
}

export interface IStyleSettings {
	backgroundColor?: CSSProperties['backgroundColor'];
	color?: CSSProperties['color'];
	height?: CSSProperties['height'];
	padding?: CSSProperties['padding'];
	width?: CSSProperties['width'];
}

export interface IHeaderSettings extends INavigationSettings, IStyleSettings {
}

export interface ISidenavSettings extends INavigationSettings {
	elevationOnSmallScreen?: number;
	mode?: SidenavMode;
	position: Positioning.Left | Positioning.Right;
	width: {
		collapsed: CSSProperties['width'];
		expanded: CSSProperties['width'];
	}
}

export interface IPalette {
	paper?: CSSProperties['color'];
	primary?: CSSProperties['color'];
	secondary?: CSSProperties['color'];
	tertiary?: CSSProperties['color'];
	text?: CSSProperties['color'];
	textContrast?: CSSProperties['color'];
}

export interface ISettings {
	colors?: IPalette;
	containerWidth: CSSProperties['width'];
	fontFamily: CSSProperties['fontFamily'];
	footer?: IStyleSettings;
	header: IHeaderSettings;
	pageTransition?: PageTransition | null;
	sideNav: ISidenavSettings;
}
