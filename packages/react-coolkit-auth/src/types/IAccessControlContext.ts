import { IAuthResponse } from './IAuthResponse';
import { IAuthUser } from './IAuthUser';
import { IChangePasswordInput } from './IChangePasswordInput';
import { ICompleteNewPasswordInput } from './ICompleteNewPasswordInput';
import { IForgotPasswordInput } from './IForgotPasswordInput';
import { IResetPasswordInput } from './IResetPasswordInput';
import { ISignInInput } from './ISignInInput';
import { ISignUpInput } from './ISignUpInput';

export interface IAccessControlContext<TAuthUser = IAuthUser> {
	authToken?: string;
	completeNewPasswordUser: boolean;
	onChangePassword?: (model: IChangePasswordInput) => Promise<IAuthResponse>;
	onCompleteNewPassword?: (newPassword: ICompleteNewPasswordInput) => Promise<IAuthResponse>;
	onFederatedSignIn?: (customProvider: unknown) => Promise<void>;
	onForgotPassword?: (email: IForgotPasswordInput) => Promise<IAuthResponse>;
	onResetPassword?: (data: IResetPasswordInput) => Promise<IAuthResponse>;
	onSignIn: (modal: ISignInInput) => Promise<void>;
	onSignOut: () => Promise<void>;
	onSignUp: (user: ISignUpInput) => Promise<any>; //IAuthResponse
	user?: TAuthUser;
}
