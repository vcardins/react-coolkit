import styled from '@emotion/styled';

const StyledSpinner = styled.svg<{ size?: number }>(({ size = 50 }) => `
	animation: rotate 2s linear infinite;
	margin: -25px 0 0 -25px;
	width: ${size}px;
	height: ${size}px;

	& .path {
		stroke: var(--color-primary);
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -124;
		}
	}
`);

export const Spinner = ({
	size = 50,
	strokeWidth = 4,
}: {
	size?: number;
	strokeWidth?: number;
}) => (
	<StyledSpinner viewBox={`0 0 ${size} ${size}`} size={size}>
		<circle
			className="path"
			cx="25"
			cy="25"
			r="20"
			fill="none"
			strokeWidth={strokeWidth}
		/>
	</StyledSpinner>
);
