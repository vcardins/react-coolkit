export enum AuthRouting {
	Home = '',

	ChangePassword = 'change-password',
	ConfirmSignUp = 'confirm-signup',
	Forbidden = 'forbidden',
	ForgotPassword = 'forgot-password',
	Profile = 'profile',
	SignIn = 'signin',
	SignOut = 'signout',
	SignUp = 'signup',
}

export const getAuthRoutes = (routing = Object.values(AuthRouting)) =>
	routing.reduce((result, route) => ({
		...result,
		[route]: `/${route}`,
	}), {} as Record<AuthRouting, string>);

export const isUnprotectedRoute = (route: string, authRouting = getAuthRoutes()) =>
	[
		authRouting[AuthRouting.SignIn],
		authRouting[AuthRouting.SignUp],
		authRouting[AuthRouting.ConfirmSignUp],
		authRouting[AuthRouting.ForgotPassword],
		authRouting[AuthRouting.Forbidden],
	].includes(route);
