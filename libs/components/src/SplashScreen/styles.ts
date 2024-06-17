import styled from '@emotion/styled';

import { ISplashScreenProps } from './types';

export const Message = styled.div`
	margin-top: 1.5em;
`;

export const Icon = styled.div`
	user-select: none;
	margin-bottom: 20px;
`;

export const Container = styled('div', { shouldForwardProp: (prop) => prop !== 'display' && prop !== 'opacity' })<Pick<ISplashScreenProps, 'opacity'> & { display: boolean; }>(({ display, opacity = 1 }) => `
	display: ${display ? 'flex' : 'none'};
	height: 100vh;
	width: 100vw;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: var(--color-primary);
	background-color: rgba(255, 255, 255, ${opacity});
`);
