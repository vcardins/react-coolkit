import { CSSProperties, useEffect, useState } from 'react';

import { css, Global } from '@emotion/react';

import { Container, Icon, Message } from './styles';
import { ISplashScreenProps } from './types';
import { Loading, LoadingType } from '../Loading';

export * from './types';

const getStyles = (color: CSSProperties['color']) => css`
	html,
	body {
		padding: 0;
		margin: 0;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		font-family: monospace;
		font-size: 16px;
		--color-primary: ${color};
	}
`;

export const SplashScreen = (props: ISplashScreenProps) => {
	const { id, delay = 10, opacity = 1, Logo, message, color, type = LoadingType.Dots } = props;
	const [showLoading, setShowLoading] = useState(delay <= 0);

	useEffect(() => {
		const timer1 = setTimeout(() => setShowLoading(true), delay);

		// this will clear Timeout
		// when component unmount like in willComponentUnmount
		// and show will not change to true
		return () => {
			clearTimeout(timer1);
		};
	}, [delay]);

	if (!showLoading || !type) {
		return null;
	}

	return (
		<Container opacity={opacity} display={!!type}>
			<Global styles={getStyles(color)} />
			{Logo ? <Icon>{Logo}</Icon> : null}
			<Loading id={id} type={type} />
			{message ? <Message id={`${id}-message`}>{message}</Message> : null}
		</Container>
	);
};
