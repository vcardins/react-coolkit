import {
	createContext,
	ReactElement,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { CacheLocation, useCache } from '@react-coolkit/core';

import { authContextDefaultValue } from './defaults';
import {
	AuthRouting,
	getAuthRoutes,
	IAccessControlContext,
	IAuthService,
	IAuthSession,
	IAuthUser,
	IChangePasswordInput,
	ICompleteNewPasswordInput,
	IErrorService,
	IForgotPasswordInput,
	IResetPasswordInput,
	ISignInInput,
	ISignUpInput,
	isUnprotectedRoute,
	// Permission,
} from '../types';

interface IAccessControlProviderProps {
	authRouting?: ReturnType<typeof getAuthRoutes>;
	authService?: IAuthService;
	errorService?: IErrorService;
	clientId?: string;
	cacheLocation?: CacheLocation;
	navigate: (
		to: string,
		options?: { replace?: boolean; state?: any }
	) => void;
	cacheKey?: string;
	children: (
		user?: IAuthUser,
		onSignOut?: () => Promise<void>
	) => ReactElement;
}

const AccessControl = createContext<IAccessControlContext>(
	authContextDefaultValue,
);

const authRoutes = getAuthRoutes();

export const AccessControlProvider = (props: IAccessControlProviderProps) => {
	const {
		authService,
		authRouting = authRoutes,
		cacheKey = 'auth-info',
		children,
		errorService,
		navigate,
	} = props;

	const startTimerInterval = useRef<NodeJS.Timeout>();
	const [user, setUser] = useState<IAuthUser>();
	const [completeNewPasswordUser, setCompleteNewPasswordUser] =
		useState<IAuthUser>();
	const authToken = useRef<string | undefined>('');
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [session, setSession, clearSession] =
		useCache<IAuthSession>({ cacheKey });

	if (!authService) {
		throw new Error('The Auth api service is required');
	}

	const navigateToHome = useCallback(() => {
		navigate(`${authRouting[AuthRouting.Home]}${location.search}`, {
			replace: true,
		});
	}, []);

	const navigateToSignIn = useCallback(
		(keepLocationSearch: boolean) => {
			navigate(
				`${authRouting[AuthRouting.SignIn]}${keepLocationSearch ? location.search : ''}`,
				{
					replace: true,
				},
			);
		},
		[],
	);


	const handleRevokeUserAuthorization = useCallback(async () => {
		await authService.signOut();
		setUser(undefined);
		authToken.current = undefined;
		clearSession();
	}, [authService, clearSession]);

	const handleSignOut = useCallback(
		async (keepLocationSearch = false) => {
			await handleRevokeUserAuthorization();
			navigateToSignIn(keepLocationSearch);
		},
		[handleRevokeUserAuthorization],
	);

	const handleSignInSucceeded = useCallback(
		async (data: IAuthUser) => {
			try {
				const currentSession = await authService.getCurrentSession();

				if (!currentSession) {
					throw new Error('Session could not be initialized');
				}

				const { expires_in, access_token, refresh_token, expires_at } =
					currentSession;

				const delay = expires_in * 1000;

				if (typeof authService?.refreshSession === 'function') {
					startTimerInterval.current = setTimeout(async () => {
						const response = await authService?.refreshSession({
							access_token,
							refresh_token,
						});

						if (!response.error) {
							setSession(response.data);

							return setUser(response.data.user);
						}

						throw response.error;
					}, delay);
				}

				authToken.current = access_token;

				setUser(data);
				setSession(currentSession);

				if (expires_at) {
					console.info(
						`Token to be refreshed in ${Math.round(
							expires_in / 60,
						)} min - [${new Date(expires_at * 1000).toLocaleString()}]`,
					);
				}
			}
			catch (e: any) {
				if (e.status === 403) {
					await handleSignOut();
				}
				throw e;
			}
		},
		[authService, handleSignOut],
	);

	const handleSignIn = useCallback(
		async (props: ISignInInput) => {
			setHasSubmitted(true);

			const user = await authService.signIn(props);

			if (user.completeNewPassword) {
				setCompleteNewPasswordUser(user);
			}
			else {
				await handleSignInSucceeded(user);
				navigateToHome();
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[authService, handleSignInSucceeded, navigateToHome],
	);

	const handleSignUp = useCallback(
		async ({ email, password, ...attributes }: ISignUpInput) => {
			try {
				const body = {
					email,
					password,
					attributes,
				} as ISignUpInput;

				return await authService.signUp(body);
			}
			catch (error) {
				errorService?.onAdd?.(error as Error);
			}
		},
		[authService, errorService?.onAdd],
	);

	const handleCompleteNewPassword = useCallback(
		async (model: ICompleteNewPasswordInput) => {
			if (!completeNewPasswordUser) return { message: '', isError: true };

			await authService.completeNewPassword(
				completeNewPasswordUser,
				model.newPassword,
			);

			setCompleteNewPasswordUser(undefined);

			return { message: 'User successfully updated the password' };
		},
		[authService, completeNewPasswordUser, setCompleteNewPasswordUser],
	);

	const handleChangePassword = useCallback(
		async (model: IChangePasswordInput) => {
			try {
				await authService.changePassword(
					model.oldPassword,
					model.newPassword,
				);

				return { message: 'User successfully changed the password' };
			}
			catch (error) {
				errorService?.onAdd?.(error as Error);
			}
		},
		[authService, errorService?.onAdd],
	);

	const handleForgotPassword = useCallback(
		async ({ email }: IForgotPasswordInput) => {
			try {
				const response = await authService.forgotPassword(email);

				return response;
			}
			catch (error) {
				errorService?.onAdd?.(error as Error);
			}
		},
		[authService, errorService?.onAdd],
	);

	const handleResetPassword = useCallback(
		async ({ email, accessCode, newPassword }: IResetPasswordInput) => {
			try {
				const message = await authService.forgotPasswordSubmit(
					email,
					accessCode,
					newPassword,
				);

				return { message };
			}
			catch (error) {
				errorService?.onAdd?.(error as Error);
			}
		},
		[authService, errorService?.onAdd],
	);

	useEffect(() => {
		const init = async () => {
			try {
				const inGuestRoute = isUnprotectedRoute(
					location.pathname,
					authRouting,
				);
				const currentSession = await authService.getCurrentSession();
				const currentUser = await authService.getCurrentUser();

				// If there is a valid session and the route is
				// unprotected, redirect the user to the home route
				if (inGuestRoute) {
					if (currentSession && currentUser) {
						await handleSignInSucceeded(currentUser);

						return navigateToHome();
					}
				}
				else {
					// If the route is protected and the session and user either:
					// 1. Hasn't been created or,
					// 2. Expired, sign the user out
					if (
						!currentSession ||
						!currentUser ||
						(await currentSession?.isExpired?.())
					) {
						return handleSignOut(true);
					}

					// Set the current user
					handleSignInSucceeded(currentUser);
				}
			}
			catch (e: any) {
				errorService?.onAdd?.(e as Error);
			}
		};

		init();
	}, [
		authService,
		errorService,
		navigateToHome,
		hasSubmitted,
		handleSignInSucceeded,
		handleSignOut,
	]);

	const value = useMemo<IAccessControlContext>(
		() => ({
			user,
			session,
			authToken: authToken.current,
			completeNewPasswordUser: !!completeNewPasswordUser,
			onChangePassword: handleChangePassword,
			onCompleteNewPassword: handleCompleteNewPassword,
			onForgotPassword: handleForgotPassword,
			onResetPassword: handleResetPassword,
			onSignIn: handleSignIn,
			onSignOut: handleSignOut,
			onSignUp: handleSignUp,
		}),
		[
			session,
			completeNewPasswordUser,
			handleChangePassword,
			handleCompleteNewPassword,
			handleForgotPassword,
			handleResetPassword,
			handleSignIn,
			handleSignOut,
			handleSignUp,
			user,
		],
	);

	return (
		<AccessControl.Provider value={value}>
			{children(value.user, value.onSignOut)}
		</AccessControl.Provider>
	);
};

export const useAccessControlContext = () => {
	const context = useContext(AccessControl);

	if (context === undefined) {
		throw new Error('Access Control not provided to calling context');
	}

	return context;
};

