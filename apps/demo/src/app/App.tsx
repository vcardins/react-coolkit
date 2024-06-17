import { useCallback } from 'react';
import { NavigateOptions, useNavigate } from 'react-router-dom';

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { AccessControlProvider } from '@react-coolkit/auth';
import { LayoutContextProvider, RoutingProvider } from '@react-coolkit/layouts';

import { SplashScreen } from '@libs/components';

import { Logo } from './components';
import { metadata, settings, theme } from './config';
import { navigation, pages } from './pages';
import { supabaseAuthService } from './services';

export const App = () => {
	const navigate = useNavigate();

	const handleNavigate = useCallback(
		(to: string, options?: NavigateOptions) => {
			navigate(to, options);
		},
		[],
	);

	return (
		<EmotionThemeProvider theme={theme}>
			<AccessControlProvider
				authService={supabaseAuthService}
				navigate={handleNavigate}
			>
				{(user, onSignOut) => (
					<RoutingProvider
						documentTitle={metadata.shortName}
						isAuthorized={() => !!user?.id}
						pages={pages}
						SplashScreen={() => (
							<SplashScreen
								color={settings.colors?.primary}
								message="Loading"
								Logo={<Logo size={120} />}
							/>
						)}
					>
						<LayoutContextProvider
							metadata={{ ...metadata, Logo }}
							settings={settings}
							navigation={navigation}
							onSignOut={onSignOut}
						/>
					</RoutingProvider>
				)}
			</AccessControlProvider>
		</EmotionThemeProvider>
	);
};
