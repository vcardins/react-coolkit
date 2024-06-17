import styled from '@emotion/styled';

import { IMainContentProps } from './types';

const MainWrapper = styled.main`
	height: 100%;
	overflow: hidden;
	grid-area: main;
	display: flex;
	flex-direction: column;
`;

const Header = styled.div`
	padding: var(--header-padding) var(--base-padding);
`;

const Content = styled.div<IMainContentProps>`
	height: inherit;
	overflow: ${({ overflow = 'auto' }) => overflow};
	> * {
		overflow: inherit;
		padding: ${({ padding }) => padding ?? 'var(--base-padding)'};
	}
`;

const Footer = styled.footer`
	overflow: hidden;
	display: flex;
	align-items: center;
`;

export const Components = {
	Wrapper: MainWrapper,
	Header,
	Content,
	Footer,
};
