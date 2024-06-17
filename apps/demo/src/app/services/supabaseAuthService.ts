import { getExpiration, IAuthService, IAuthSession, IAuthUser, ISignInInput, ISignUpParams, Permission } from '@react-coolkit/auth';
import { AuthResponse, AuthTokenResponse, createClient } from '@supabase/supabase-js';


const { VITE_SUPABASE_URL, VITE_SUPABASE_KEY } = import.meta.env ?? process.env;

export const supabase = createClient(
	VITE_SUPABASE_URL,
	VITE_SUPABASE_KEY,
);

export type AuthData = AuthTokenResponse['data'];
export type AuthError = AuthTokenResponse['error'];
export type User = AuthTokenResponse['data']['user'];
export type UserSession = AuthTokenResponse['data']['session'];

type TAuthUser = IAuthUser<{ firstName: string; }, Permission>;

const formatUser = <TAuthUser>(user: User) => ({
	id: user?.id,
	username: user?.email,
	attributes: user?.user_metadata,
	permissions: { role: user?.role },
} as TAuthUser);

export const supabaseAuthService: IAuthService<TAuthUser> = {
	async signIn(params: ISignInInput) {
		const { data, error } = await supabase.auth.signInWithPassword(params);

		if (error) {
			throw new Error(error.message);
		}

		return formatUser(data.user);
	},

	async signUp<TResponse = AuthResponse>({ email, password, ...data }: ISignUpParams<object>) {
		const response = await supabase.auth.signUp({
			email,
			password,
			options: {
				data,
			},
		});

		return response as TResponse;
	},

	async signOut(): Promise<void> {
		await supabase.auth.signOut();
	},

	changePassword<TResponse = unknown>(oldPassword: string, newPassword: string): Promise<TResponse> {
		console.log(oldPassword, newPassword);

		throw new Error('Method not implemented.');
	},

	async forgotPassword<TResponse = unknown>(usernameOrEmail: string) {
		return await supabase.auth.resetPasswordForEmail(usernameOrEmail) as TResponse;
	},

	forgotPasswordSubmit<TResponse = unknown>(usernameOrEmail: string, code: string, password: string): Promise<TResponse> {
		console.log(usernameOrEmail, code, password);

		throw new Error('Method not implemented.');
	},

	confirmSignUp<TResponse = unknown>(usernameOrEmail: string, code: string): Promise<TResponse> {
		console.log(usernameOrEmail, code);

		throw new Error('Method not implemented.');
	},

	resendSignUp<TResponse = unknown>(usernameOrEmail: string): Promise<TResponse> {
		console.log(usernameOrEmail);

		throw new Error('Method not implemented.');
	},

	async getCurrentSession<TResponse = IAuthSession | undefined>() {
		const { data } = await supabase.auth.getSession();

		if (!data.session) {
			return;
		}

		return {
			...data.session,
			isExpired: async () => {
				const expiry = getExpiration((data.session.expires_at ?? 0) * 1000);

				return expiry.seconds < 0;
			},
		} as TResponse;
	},

	async getCurrentUser<TResponse = IAuthUser<unknown, Permission>>() {
		const { data } = await supabase.auth.getUser();

		if (!data.user) {
			return;
		}

		return formatUser(data.user) as TResponse;
	},

	completeNewPassword(user: IAuthUser<unknown, Permission>, newPassword: string): Promise<unknown> {
		console.log(user, newPassword);

		throw new Error('Method not implemented.');
	},

	async getUserProfile(userId: string) {
		const { data, error } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', userId)
			.single(); //<IAuthUserProfile>

		if (data) {
			return data;
		}

		return error;
	},

	async refreshSession<TResponse = IAuthSession | { error: unknown }>(params: { access_token: string; refresh_token: string; }) {
		const newSession = await supabase.auth.setSession(params);

		return newSession as TResponse;
	},
};

