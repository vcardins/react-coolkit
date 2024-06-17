import { css } from '@emotion/react';
import styled from '@emotion/styled';

const SidenavWrapper = styled.aside<{ elevation?: number }>`
	position: fixed;
	height: 100vh;
	overflow: hidden;
	grid-area: sidenav;
	width: var(--sidenav-extended-width);
	background-color: var(--color-primary);
	color: var(--color-paper);
	transition: transform .5s ease-in-out;
	z-index: 2;
	display: flex;
	flex-direction: column;

	${({ elevation = 0 }) => elevation > 0 && css`
		transform: translateX(0);
		box-shadow:
			rgba(0, 0, 0, 0.2) 0px ${elevation * 8}px 10px -5px,
			rgba(0, 0, 0, 0.14) 0px 16px 24px 2px,
			rgba(0, 0, 0, 0.12) 0px 6px 30px 5px;
	`}
`;

const HeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	min-height: var(--header-height);
	background-color: var(--color-paper);
	color: var(--color-primary);
	justify-content: space-between;
`;

const BrandWrapper = styled.div`
	display: flex;
	margin-left: var(--base-padding);
	align-items: center;
`;

const HeaderClose = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ProfileWrapper = styled.div`
	display: flex;
	align-items: center;
	background-color: var(--color-paper);
`;

const ProfileAvatar = styled.div`
	background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1609106/headshot.png");
	background-image: url("../../img/headshot.png");
	background-size: cover;
	background-repeat: no-repeat;
	border-radius: 50%;
	border: 2px solid rgba(255, 255, 255, 0.2);
	height: 64px;
	width: 64px;
	margin: 0 15px;
`;

const ProfileTitle = styled.div`
	font-size: 17px;
	letter-spacing: 1px;
`;

const SideNav = styled.nav`
	overflow-y: auto;
	overflow-x: hidden;
	height: inherit;
	margin-top: 1em;
`;

const Footer = styled.div<{ sidenavActive?: boolean }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 0.5em ${({ sidenavActive }) => sidenavActive ? '0.75em' : 'calc(var(--sidenav-collapsed-width) / 4.5)'};
	background-color: rgba(255, 255, 255, 0.1);
	min-height: var(--sidenav-footer-height);
`;

export const Components = {
	Wrapper: SidenavWrapper,
	Profile: {
		Wrapper: ProfileWrapper,
		Avatar: ProfileAvatar,
		Title: ProfileTitle,
	},
	Header: {
		Wrapper: HeaderWrapper,
		Close: HeaderClose,
	},
	Brand: {
		Wrapper: BrandWrapper,
	},
	SideNav,
	Footer,
};
