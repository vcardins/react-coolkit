import { CSSProperties } from 'react';

import styled from '@emotion/styled';

export const LinearProgressContainer = styled.div<{ position?: CSSProperties['flexDirection'] }>(({ position = 'column' }) => `
	display: flex;
	flex-direction: ${position};
	flex: 1;
	align-items: center;
	justify-items: ${position === 'column' ? 'center' : undefined}; ;
	>* { text-align: center; }
`);

export const Linear = styled('progress')`
	appearance: none;
	border: none;
	height: 0.25em;
	width: 20em;
	color: var(--color-primary);
	background-color: var(--color-white);
	font-size: 16px;
	margin-top: 1em;

	&::-webkit-progress-bar {
		background-color: transparent;
	}

	&::-webkit-progress-value,
	&::-moz-progress-bar {
		background-color: currentColor;
		transition: all 0.2s;
	}

	&::-ms-fill {
		border: none;
		background-color: currentColor;
		transition: all 0.2s;
	}

	&:indeterminate {
		background-size: 200% 100%;
		background-image: linear-gradient(to right, transparent 50%, currentColor 50%, currentColor 60%, transparent 60%, transparent 71.5%, currentColor 71.5%, currentColor 84%, transparent 84%);
		animation: progress-linear 2s infinite linear;

		&::-moz-progress-bar {
			background-color: transparent;
		}

		&::-ms-fill {
			animation-name: none;
		}
	}

	@keyframes progress-linear {
		0% {
			background-size: 200% 100%;
			background-position: left -31.25% top 0%;
		}

		50% {
			background-size: 800% 100%;
			background-position: left -49% top 0%;
		}

		100% {
			background-size: 400% 100%;
			background-position: left -102% top 0%;
		}
	}
`;
