// https://github.com/curveball/a12n-server/blob/main/src/routes.ts

import { IAuthSession } from './IAuthSession';
import { IAuthUser } from './IAuthUser';
import { ISignInInput } from './ISignInInput';
import { ISignUpInput } from './ISignUpInput';
import { ISignUpResult } from './ISignUpResult';
import { Permission } from './Permission';

export interface IAuthService<TAuthUser = IAuthUser<any, Permission>> {
	/**
	 * Sign in
	 * @param {SignInParams} signInParams - The username to be signed in or the sign in options
	 * @return - A promise resolves the AuthUser
	 */
	signIn<TResponse = TAuthUser>(signInParams: ISignInInput): Promise<TResponse>;

	/**
	* Sign up with username, password and other attributes like phone, email
	* @param {object} params - The user attributes used for signin
	* @return - A promise resolves callback data if success
	*/
	signUp<TResponse = ISignUpResult>(params: ISignUpInput): Promise<TResponse>;

	/**
	 * Sign out method
	 * @
	 * @return - A promise resolved if success
	 */
	signOut(): Promise<void>;

	/**
	 * Change a password for an authenticated user
	 * @param {Object} username - The user username
	 * @param {String} oldPassword - the current password
	 * @param {String} newPassword - the requested new password
	 * @return - A promise resolves if success
	 */
	changePassword<TResponse = any>(oldPassword: string, newPassword: string): Promise<TResponse>;

	/**
	 * Initiate a forgot password request
	 * @param {String} username - the username to change password
	 * @return - A promise resolves if success
	 */
	forgotPassword<TResponse = any>(username: string): Promise<TResponse>;

	/**
	 * Confirm a new password using a confirmation Code
	 * @param {String} username - The username
	 * @param {String} code - The confirmation code
	 * @param {String} password - The new password
	 * @return - A promise that resolves if success
	 */
	forgotPasswordSubmit<TResponse = any>(username: string, code: string, password: string): Promise<TResponse>;

	/**
	* Send the verification code to confirm sign up
	* @param {String} username - The username to be confirmed
	* @param {String} code - The verification code
	* @return - A promise resolves callback data if success
	*/
	confirmSignUp<TResponse = any>(username: string, code: string): Promise<TResponse>;

	/**
	 * Resend the verification code
	 * @param {String} username - The username to be confirmed
	 * @return - A promise resolves code delivery details if successful
	 */
	resendSignUp<TResponse = any>(username: string): Promise<TResponse>;

	/**
	 * Get Session
	 * @return - A promise resolves the user session
	 */
	getCurrentSession<TResponse = IAuthSession>(): Promise<TResponse | undefined>;

	/**
	 * Get Current User
	 * @return - A promise resolves the current logged user
	 */
	getCurrentUser<TResponse = IAuthUser<any, Permission>>(): Promise<TResponse | undefined>;

	completeNewPassword(user: IAuthUser, newPassword: string): Promise<any>;

	getUserProfile<TResponse extends { id: string; }>(userId: string): Promise<TResponse | undefined>;

	refreshSession<TResponse = IAuthSession>(params: { access_token: string; refresh_token: string }): Promise<{ data: TResponse; error: any }>;
}
