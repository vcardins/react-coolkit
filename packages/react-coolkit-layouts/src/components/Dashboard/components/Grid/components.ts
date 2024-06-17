import { css } from '@emotion/react';
import styled from '@emotion/styled';

const sidenav = {
	visible: css`
		grid-template-columns: var(--sidenav-extended-width) calc(100% - var(--sidenav-extended-width));
		grid-template-rows: var(--header-height) 1fr;
		grid-template-areas:
			'sidenav header'
			'sidenav main'
			'sidenav footer';
	`,
	hidden: css`
		grid-template-columns: 100%;
		grid-template-rows: var(--header-height) 1fr;
		grid-template-areas:
			'header'
			'main';
	`,
};

export const Wrapper = styled.div`
	display: grid;
	position: relative;
	height: 100vh;
	overflow: hidden;
	transition: 0.5s;

	&[data-sidenav-active] {
		${sidenav.hidden};
	}

	&:not([data-sidenav-active]) {
		${sidenav.visible};
	}

	&[data-sidenav-active="false"] {
		#layout-sidenav {
			transform: translate3d(-100%, 0, 0);
			#sidenav-toggle {
				display: none;
			}
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		#layout-sidenav {
			transition: transform 0.25s;
		}
	}

	@media only screen and (min-width: 46.875em) {
		&[data-sidenav-active="false"] {
			${sidenav.hidden};
		}

		&[data-sidenav-active="true"] {
			${sidenav.visible};
		}
	}
`;
