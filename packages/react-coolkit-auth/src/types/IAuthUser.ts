import { Permission } from './Permission';

export interface IAuthUser<TAttributes = any, TPermissions = Permission> {
	id: string | number;
	username: string;
	attributes?: TAttributes;
	permissions?: TPermissions;
	completeNewPassword?: boolean;
}
