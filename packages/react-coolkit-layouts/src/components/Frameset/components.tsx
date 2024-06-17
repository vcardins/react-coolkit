import styled from '@emotion/styled';

import { IFramesetContentProps } from './types';

export const Container = styled('div')`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1em;
	background-color: #ccc;
`;

export const Footer = styled('div')`
	display: flex;
	padding: 1em;
	border-top: 1px solid #ddd;
`;

export const Title = styled.span`
	display: flex;
	align-items: center;
	gap: 1em;
	flex: 1;
`;

// , shouldForwardProp(['autoWidth']))<IFramesetContentProps>
// </IFramesetContentProps>
export const Content = styled('div')<IFramesetContentProps>(
	({ margin, autoWidth, overflow }) => `
	position: relative;
	width: 100%;
	overflow: ${overflow};
	${margin && `margin: ${margin}`};
	${autoWidth && '> * { width: 100% }'}
`,
);
