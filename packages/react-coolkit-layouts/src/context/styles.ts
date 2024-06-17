import { css, SerializedStyles } from '@emotion/react';

import { ISettings, Subset } from '../types';

/**
 * Pulled global styling from https://nextjs.org/learn/basics/assets-metadata-css/global-styles
 * an converted it to emotion object styling rather then string literal
 */
export const getDefaultStyle = (settings?: Subset<ISettings>): SerializedStyles => css`
	html {
		--color-text: ${settings?.colors?.text ?? '#444'}; ;
		--color-paper: ${settings?.colors?.paper ?? '#fff'};
		--color-primary: ${settings?.colors?.primary ?? '#3f4aa6'};
		--color-secondary: ${settings?.colors?.secondary ?? '#303753'};

		--color-transparent: rgba(255, 255, 255, 0.5);

		--base-padding: 1em;

		--sidenav-extended-width: ${settings?.sideNav?.width?.expanded};
		--sidenav-collapsed-width: ${settings?.sideNav?.width?.collapsed};
		--sidenav-footer-height:  ${settings?.footer?.height ?? '30px'};

		--header-elevation: ${settings?.header?.elevation ?? 0}; ;
		--header-padding: ${settings?.header?.padding ?? 'var(--base-padding)'};
		--header-height: ${settings?.header?.height ?? '50px'};

		--footer-padding: ${settings?.footer?.padding ?? 'var(--base-padding)'};
		--footer-height: ${settings?.footer?.height ?? '30px'};
	}

	body {
		padding: 0;
		margin: 0;
		font-family:
			-apple-system,
			BlinkMacSystemFont,
			Segoe UI,
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			Fira Sans,
			Droid Sans,
			Helvetica Neue,
			sans-serif;
		line-height: 1.6;
		font-size: 16px;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}

	body > div {
		height: inherit;
		width: inherit;
		overflow: hidden;
	}

	* {
		box-sizing: border-box;
	}

	a {
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}

	[disabled] {
		input,
		textarea,
		select,
		button {
			cursor: not-allowed;
		}
	}

	::-webkit-scrollbar-track {
		background-color: rgb(225, 225, 225);
	}

	::-webkit-scrollbar {
		width: 0.5em;
		height: 0.5em;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: rgb(190, 190, 190);
	}
`;
