import { isValidElement, StrictMode } from 'react';

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';

import { LayoutContextProvider, RoutingProvider } from './context';
import { IAppConfig } from './types';

export const render = (props: IAppConfig) => {
	const {
		container = 'root',
		App,
		strictMode,
		theme,
		...rest
	} = props;
	const root = createRoot(document.getElementById(container) as HTMLElement);

	const node = (
		<EmotionThemeProvider theme={theme}>
			<RoutingProvider
				pages={rest.pages}
				documentTitle={rest.metadata.shortName}
			>
				{isValidElement(App)
					? <App />
					: (
							<LayoutContextProvider
								{...rest}
								styles={rest.styles}
								navigation={rest.navigation}
							/>
						)
				}
			</RoutingProvider>
		</EmotionThemeProvider>
	);

	root.render(strictMode
		? <StrictMode>{node}</StrictMode>
		: node,
	);
};
