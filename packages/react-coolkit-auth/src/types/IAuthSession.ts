import { IAuthUser } from './IAuthUser';

export interface IAuthSession {
	access_token: string;
	refresh_token: string;
	/*
	* The number of seconds until the token expires (since it was issued). Returned when a login is confirmed.
	*/
	expires_in: number;
	/*
	* A timestamp of when the token will expire. Returned when a login is confirmed.
	*/
	expires_at?: number;
	token_type: string;
	user: IAuthUser;
	isExpired?: () => Promise<boolean>;
}
