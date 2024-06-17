import { Suspense } from 'react';

import styled from '@emotion/styled';

import { ILayoutProps } from '../../types';
import { Background } from '../Background';
import { LinearProgress } from '../Progress';

const Container = styled.div`
	height: 100%;
	padding: var(--base-padding);
	display: flex;
	flex: 1;
	overflow: auto;
`;

const Grid = styled.div`
	width: inherit;
	height: inherit;
	display: flex;
`;

export const ColumnLayout = ({ id, renderedRoutes, activeRoute }: ILayoutProps) => {
	const { backgroundImage, backgroundColor } = activeRoute.layout?.config ?? {};

	return (
		<Grid id={id}>
			<Background
				backgroundImage={backgroundImage}
				backgroundColor={backgroundColor}
				centered
			/>
			<Container>
				<Suspense fallback={<LinearProgress />}>
					{renderedRoutes}
				</Suspense>
			</Container>
		</Grid>
	);
};
