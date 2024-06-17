import { IAuthUser } from './IAuthUser';

export class UserProfile<TAttributes = any, TPermissions = any> implements IAuthUser<TAttributes, TPermissions> {
	id: string | number;
	username: string;
	attributes?: TAttributes;
	permissions?: TPermissions;
	completeNewPassword?: boolean | undefined;

	constructor(authUser: IAuthUser, permissions?: TPermissions) {
		this.id = authUser.id;
		this.attributes = authUser.attributes;
		this.permissions = permissions;
		this.username = authUser.username;
	}

	refreshSession = (newToken: string) => newToken;
}
