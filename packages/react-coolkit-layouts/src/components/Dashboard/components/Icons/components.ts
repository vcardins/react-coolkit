import styled from '@emotion/styled';

export const Button = styled.button`
	text-align: center;
	background-color: transparent;
	border: none;
	cursor: pointer;
	color: inherit;
`;

export const Svg = styled.svg`
	user-select: none;
	width: 1em;
	height: 1em;
	display: inline-block;
	fill: currentcolor;
	flex-shrink: 0;
	transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	font-size: 1.25rem;
`;
