import styled from '@emotion/styled';

const Container = styled('progress')`
	appearance: none;
	border: none;
	height: 0.25em;
	color: rgb(var(--primary-rgb, 33, 150, 243));
	background-color: rgba(
		var(--primary-rgb, 33, 150, 243),
		0.12
	);
	font-size: 16px;
	&:indeterminate {
		background-size: 200% 100%;
		background-image: linear-gradient(to right, transparent 50%, currentColor 50%, currentColor 60%, transparent 60%, transparent 71.5%, currentColor 71.5%, currentColor 84%, transparent 84%);
		animation: progress-linear 2s infinite linear;
	}
	&::-webkit-progress-value {
		background-color: currentColor;
		transition: all 0.2s;
	}

	&::-webkit-progress-bar {
		background-color: transparent;
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

export const LinearProgress = () => (
	<Container />
);
