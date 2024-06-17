import { CSSProperties } from 'react';

export interface Mixins {
	frameset?: {
		header?: CSSProperties;
		body?: CSSProperties;
	};
	footer?: CSSProperties;
	navbar?: CSSProperties;
}

export interface Color {
	50: string;
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	600: string;
	700: string;
	800: string;
	900: string;
	A100: string;
	A200: string;
	A400: string;
	A700: string;
}

interface Tertiary {
	xLightestGrey?: string;
	lightestGrey?: string;
	lighterGrey?: string;
	lightGrey?: string;
	grey?: string;
	midGrey?: string;
	deepGrey?: string;
}

interface Secondary {
	lightBlue?: string;
	blue?: string;
	midBlue?: string;
	lightGreen?: string;
	green?: string;
	lightYellow?: string;
	yellow?: string;
	lightPurple?: string;
	purple?: string;
	lightRed?: string;
	red?: string;
	darkRed?: string;
}

interface Primary {
	blue?: string;
	green?: string;
	cyan?: string;
	white?: string;
	dark?: string;
}

interface Palette {
	primary?: string[];
	secondary?: string[];
	tertiary?: string[];
	grey: Color;
}

interface Spacing {
	none: number;
	mini: string;
	small: string;
	normal: string;
	medium: string;
	large: string;
	larger: string;
	largest: string;
}

declare module '@emotion/react' {
	export interface Theme {
		mixins: Mixins;
		palette: Palette;
		spacing: Spacing;
	}
}
