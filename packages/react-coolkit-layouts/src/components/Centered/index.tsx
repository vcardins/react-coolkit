import { Suspense } from 'react';

import styled from '@emotion/styled';

import { ILayoutProps } from '../../types';
import { Background } from '../Background';
import { LinearProgress } from '../Progress';

const Container = styled.div`
	overflow: hidden;
	padding: 1em;
	display: flex;
	flex-direction: column;
	border-radius: 12px;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.8);
	max-width: 60%;
	max-height: 400px;
`;

export const CenteredLayout = ({ id, renderedRoutes, activeRoute }: ILayoutProps) => {
	const { backgroundImage, backgroundColor } = activeRoute.layout?.config ?? {};

	return (
		<Background
			id={id}
			backgroundImage={backgroundImage}
			backgroundColor={backgroundColor}
			centered
		>
			<Container>
				<Suspense fallback={<LinearProgress />}>{renderedRoutes}</Suspense>
			</Container>
		</Background>
	);
};
