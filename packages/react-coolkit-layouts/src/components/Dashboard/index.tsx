import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import styled from '@emotion/styled';
import { animated, useTransition, UseTransitionProps } from '@react-spring/web';

import { Grid, Header, Main, Sidenav } from './components';
import { useLayoutContext } from '../../context';
import { ILayoutProps, PageTransition } from '../../types';

const AnimatedContent = styled(animated.div)`
	position: relative;
`;

// https://alvarotrigo.com/blog/css-page-transitions/
const pageTransitionsStyles = {
	[PageTransition.Fade]: {
		from: { opacity: 0 },
		enter: { opacity: 1 },
	},
	[PageTransition.Slide]: {
		from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
		enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
	},
} as Record<PageTransition, UseTransitionProps>; //

export const DashboardLayout = (props: ILayoutProps) => {
	const { renderedRoutes, activeRoute } = props;
	const { settings } = useLayoutContext();
	const transition = useTransition(
		useLocation(),
		pageTransitionsStyles[settings.pageTransition ?? PageTransition.Fade],
	);

	return (
		<Grid>
			<Header />
			<Sidenav />
			<Main route={activeRoute}>
				<Suspense>
					{settings.pageTransition
						? transition((styles, location) => (
							<AnimatedContent key={location.pathname} style={styles}>
								{renderedRoutes}
							</AnimatedContent>
						))
						: renderedRoutes
					}
				</Suspense>
			</Main>
		</Grid>
	);
};
