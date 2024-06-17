import { createContext, ReactElement, useCallback, useContext, useEffect, useMemo } from 'react';
import { matchRoutes, NavigateOptions, RouteObject, useLocation, useNavigate, useRoutes } from 'react-router-dom';

import { IRoute, IRoutingContext, IRoutingContextProps } from '../types';

const RoutingContext = createContext<IRoutingContext>({
	renderedRoutes: null,
	activeRoute: {} as IRoute,
	navigate: () => undefined,
});

export const RoutingProvider = (props: IRoutingContextProps) => {
	const {
		documentTitle,
		children,
		pages,
		SplashScreen = () => <div>Loading</div>,
		isAuthorized = () => true,
	} = props;
	const location = useLocation();
	const navigate = useNavigate();
	const routes = useMemo(
		() =>
			pages.flatMap((page) =>
				page.routes.map(
					(route) =>
						({
							...route,
							layout: {
								style:
									route.layout?.style ?? page.layout?.style,
								// TODO: Implement deep merge for route config
								config:
									route.layout?.config ?? page.layout?.config,
							},
							accessControl:
								route.accessControl ?? page.accessControl,
							element: route.element as ReactElement,
						} as IRoute),
				),
			),
		[pages],
	);

	const activeRoute = matchRoutes(routes as RouteObject[], location)?.[0]
		?.route as IRoute;

	const routesValues = routes as RouteObject[];

	const handleNavigate = useCallback(
		(to: string, options?: NavigateOptions) => {
			if (!routesValues.find(({ path }) => path === to)) {
				throw new Error(
					'The route is invalid. Navigation has been halted.',
				);
			}

			navigate(to, options);
		},
		[routesValues],
	);

	useEffect(() => {
		if (activeRoute) {
			document.title =
				activeRoute.metadata?.documentTitle ?? documentTitle;
		}

		return () => {
			document.title = '';
		};
	}, [documentTitle, activeRoute]);

	const renderedRoutes = useRoutes(
		routesValues.map(({ caseSensitive, path, element, children }) => ({
			caseSensitive,
			path,
			element,
			children,
		})),
		location,
	);

	const value = useMemo<IRoutingContext>(
		() => ({
			renderedRoutes,
			activeRoute,
			navigate: handleNavigate,
		}),
		[renderedRoutes, activeRoute, handleNavigate],
	);

	// If the user object is not loaded and the active route
	// requires authentication display the Page Loader
	if (!isAuthorized() && activeRoute?.accessControl) {
		return <SplashScreen />;
	}

	return (
		<RoutingContext.Provider value={value}>
			{children}
		</RoutingContext.Provider>
	);
};

export const useRoutingContext = () => {
	const context = useContext(RoutingContext) as IRoutingContext;

	if (context === undefined) {
		throw new Error('RoutingContext not provided to calling context');
	}

	return context;
};
