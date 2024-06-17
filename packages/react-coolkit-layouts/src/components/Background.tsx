import styled from '@emotion/styled';

import { shouldForwardProp } from './utils';
import { ILayoutConfig } from '../types';

type IBackground = Pick<ILayoutConfig, 'backgroundColor' | 'backgroundImage'> & { centered?: boolean; animate?: boolean };

export const Background = styled('div', shouldForwardProp(['backgroundColor', 'backgroundImage', 'centered', 'animate']))<IBackground>(({ centered, animate, backgroundColor, backgroundImage }) => `
	display: flex;
	flex-direction: row;
	overflow: hidden;
	flex: 1;
	height: 100%;
	background-size: auto;
	background-color: ${backgroundColor ?? 'var(--color-primary)'};
	${backgroundImage ? `background-image: url(${backgroundImage}); background-repeat: no-repeat;` : undefined};
	${centered ? 'align-items: center; justify-content: center;' : undefined};
	${animate ? 'animation: jss6 60s infinite;' : undefined};
`);
