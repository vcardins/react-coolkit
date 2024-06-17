import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { IMenuProps } from './types';

const baseNavigationStyle = css`
	width: inherit;
	padding: 0;
	margin: 0;
	list-style-type: none;
	display: flex;
	user-select: none;
`;

// Define animations
const openAnimation = css`
	/* top: 0px; */
	opacity: 1;
`;

const closedAnimation = css`
	/* top: 5px; */
	opacity: 0;
`;

export const MenuItemLink = styled.a<{ level: number }>`
	position: relative;
	padding: 6px 12px 6px ${({ level }) => level <= 1 ? 20 : (level + 1) * 10}px;
	text-transform: capitalize;
	width: 100%;
	display: flex;
	white-space: nowrap;

	font-size: ${({ level }) => level === 0 ? 16 : 14}px;

	&:hover {
		text-decoration: none;
	}
`;

export const MenuItemLabel = styled.label``;

export const MenuItemCheckbox = styled.input`
	opacity: 0;
	position: absolute;
`;

export const MenuItemIcon = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	line-height: 0;
	font-size: 16px;
	width: 12px; // Keep spacing consistent
	margin-right: 20px;
`;

export const MenuItemTitle = styled.span`
`;

export const Div = styled.div``;

export const SubMenu = styled.ul`
	padding: 0;
	margin: 0;
	list-style-type: none;
	transition: all 0.4s ease-in-out;
	width: 100%;
`;

export const MenuItem = styled.li`
	text-transform: capitalize;
	position: relative;
	min-width: 130px;

	label {
		cursor: pointer;
	}

	&[role="menuitem"] > label [role="link"]:after {
		position: absolute;
		content: '';
		height: 5px;
		width: 5px;
		top: 15px;
		right: 20px;
		border-left: 1px solid var(--color-transparent);
		border-bottom: 1px solid var(--color-transparent);
		transform: rotate(225deg);
		transition: all 0.2s;
	}

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
		cursor: pointer;
	}
`;

export const HorizontalNavigation = styled.ul<{ trigger: IMenuProps['trigger']}>`
	${baseNavigationStyle};
	flex-direction: row;

	> [role="menuitem"] > [role="link"] {
		line-height: 30px;
	}

	[role="menu"] {
		display: none;
		margin-left: 20px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
		border-radius: 0 4px 4px 4px;
		[role="menu"] {
			left: 100%;
			top: 0;
			margin-left: -10px;
			margin-top: 10px;
		}
	}

	[role="menuitem"] {
		[role="menu"] [role="menuitem"] [role="link"] {
			padding-left: 0;
			font-size: 14px;
		}

		${({ trigger }) => trigger === 'click' ? '[role="menuitemcheckbox"]:checked + label > [role="link"]:after' : '&:hover > label > [role="link"]:after'} {
			transform: rotate(315deg);
		}

		[role="menu"] {
			position: absolute;
			background-color: var(--color-primary);
			color: var(--color-paper);
		}

		${({ trigger }) => trigger === 'click' ? '[role="menuitemcheckbox"]:checked ~ [role="menu"]' : '&:hover > [role="menu"]'} {
			display: block;
			// TODO: investigate hy the animation doesn't work
			/* animation: navmenu 500ms forwards; */
		}
	}

	@keyframes navmenu {
		0% {
			${openAnimation};
		}
		100% {
			${closedAnimation};
		}
	}
`;

export const VerticalNavigation = styled.ul<{ trigger: IMenuProps['trigger']}>`
	${baseNavigationStyle};
	flex-direction: column;

	[role="menuitem"] {
		${({ trigger }) => {
		const open = css`
				visibility: visible;
				overflow: hidden;
				max-height: 1000px;
			`;

		const closed = css`
				visibility: hidden;
				max-height: 0;
			`;

		if (trigger === 'click') {
			return css`
					[role="menuitemcheckbox"]:checked ~ [role="menu"] {
						${open};
					}

					[role="menuitemcheckbox"]:checked + label [role="link"]:after {
						transform: rotate(315deg);
					}

					[role="menuitemcheckbox"]:not(:checked) ~ [role="menu"],
					[role="menuitemcheckbox"]:not(:checked) [role="menu"] {
						${closed};
						opacity: 0;
					}
				`;
		}

		return css`
				&:hover {
					> [role="menu"] {
						${open};
					}

					> [role="link"]:after {
						transform: rotate(315deg);
					}
				}

				[role="menu"] {
					${closed};
				}
			`;
	}}
	}
`;
