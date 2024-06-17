import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Global } from '@emotion/react';
import { useCache, useWindowSize } from '@react-coolkit/core';
import { deepmerge } from 'deepmerge-ts';

import { useRoutingContext } from './RoutingContext';
import { getDefaultStyle } from './styles';
import { CenteredLayout, ColumnLayout, DashboardLayout, EmptyLayout } from '../components';
import {
	IAppLayoutContext,
	IAppLayoutProps,
	INavigation,
	IRoute,
	ISettings,
	LayoutStyle,
	PageTransition,
	Positioning,
	SidenavMode,
	Subset,
} from '../types';

export const LayoutMap = {
	[LayoutStyle.Centered]: CenteredLayout,
	[LayoutStyle.Empty]: EmptyLayout,
	[LayoutStyle.Dashboard]: DashboardLayout,
	[LayoutStyle.Column]: ColumnLayout,
};

const defaultSettings: ISettings = {
	containerWidth: 1570,
	pageTransition: PageTransition.Fade,
	sideNav: {
		menuTrigger: 'click',
		iconPositioning: Positioning.Left,
		position: Positioning.Left,
		mode: SidenavMode.Collapsible,
		elevation: 0,
		elevationOnSmallScreen: 2,
		fontSize: 14,
		width: { collapsed: 56, expanded: 200 },
		gap: 0,
	},
	fontFamily: '-apple-system',
	header: {
		iconPositioning: Positioning.Left,
		fontSize: 14,
		elevation: 2,
		height: '48px',
		gap: 10,
	},
};

export const LayoutContext = createContext<IAppLayoutContext>({
	id: '',
	renderedRoutes: null,
	profile: undefined,
	smallScreen: false,
	fixedSidenav: false,
	metadata: {} as IAppLayoutProps['metadata'],

	activeRoute: {} as IRoute,
	sidenavActive: false,
	settings: defaultSettings,
	navigate: () => undefined,
	toggleSidenav: () => undefined,
	updateNavigation: () => undefined,
	updateSettings: () => undefined,
});

type ILayoutState = Pick<IAppLayoutProps, 'sidenavActive'>

export const LayoutContextProvider = (props: IAppLayoutProps) => {
	const { metadata, children, ...rest } = props;

	const [layoutState, setLayoutState] = useCache<ILayoutState>({
		cacheKey: 'layoutState',
		initialValue: { sidenavActive: !!rest.sidenavActive },
	});
	const [settings, setSettings] = useState<ISettings>(() => {
		let updatedSettings = deepmerge(defaultSettings, rest.settings) as ISettings;

		if (rest.settings?.pageTransition === null) {
			updatedSettings = { ... updatedSettings, pageTransition: null };
		}

		return updatedSettings;
	});
	const [sidenavActive, toggleSidenav] = useState(layoutState.sidenavActive);
	const [navigation, setNavigation] = useState(rest.navigation);
	const [profile, setProfile] = useState<ReactNode>(null);
	const [styles, setStyles] = useState<IAppLayoutProps['styles']>(getDefaultStyle(rest.settings));

	const { renderedRoutes, activeRoute, navigate } = useRoutingContext();
	const screen = useWindowSize();
	const smallScreen = useMemo(() => (screen?.width ?? 0) < 768, [screen?.width]);

	const layoutStyle = activeRoute?.layout?.style ?? LayoutStyle.Empty;
	const PageLayout = LayoutMap[layoutStyle];
	const layoutId = `layout-${layoutStyle}`;

	const handleToggleSidenav = useCallback(() => {
		toggleSidenav((prevState) => {
			setLayoutState({ ... layoutState, sidenavActive: !prevState });

			return !prevState;
		});
	}, [setLayoutState, layoutState]);

	const fixedSidenav = settings.sideNav.mode === SidenavMode.Fixed;

	useEffect(() => {
		if (navigation?.sideNav?.length && !fixedSidenav) {
			toggleSidenav(!smallScreen);
		}
	}, [navigation?.sideNav?.length, settings.sideNav.mode, smallScreen, fixedSidenav]);

	const updateSettings = useCallback((value: Subset<ISettings>) => {
		setSettings((prevState) => {
			const updatedSettings = deepmerge(prevState, value) as ISettings;

			setStyles(getDefaultStyle(updatedSettings));

			return updatedSettings;
		});
	}, []);

	const updateNavigation = useCallback((value: Subset<INavigation>) => {
		setNavigation((prevState) => deepmerge(prevState, value) as INavigation);
	}, []);

	const value = useMemo<IAppLayoutContext>(
		() => ({
			...rest,
			activeRoute,
			id: layoutId,
			metadata,
			navigate,
			smallScreen,
			fixedSidenav,
			navigation,
			profile,
			renderedRoutes,
			settings,
			sidenavActive,
			toggleSidenav: handleToggleSidenav,
			updateNavigation,
			updateSettings,
			updateProfile: setProfile,
		}),
		[
			activeRoute,
			fixedSidenav,
			handleToggleSidenav,
			layoutId,
			metadata,
			navigate,
			navigation,
			profile,
			renderedRoutes,
			rest,
			settings,
			sidenavActive,
			smallScreen,
			updateNavigation,
			updateSettings,
		],
	);

	return (
		<LayoutContext.Provider value={value}>
			<PageLayout
				id={layoutId}
				activeRoute={activeRoute}
				renderedRoutes={renderedRoutes}
			/>
			{styles ? <Global styles={styles} /> : null}
			{children}
		</LayoutContext.Provider>
	);
};

export const useLayoutContext = () => {
	const context = useContext(LayoutContext);

	if (context === undefined) {
		throw new Error('LayoutContext not provided to calling context');
	}

	return context;
};
