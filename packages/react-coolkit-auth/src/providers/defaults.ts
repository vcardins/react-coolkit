import {
	IAccessControlContext,
	IChangePasswordInput,
	ICompleteNewPasswordInput,
	IForgotPasswordInput,
	IResetPasswordInput,
	ISignInInput,
	ISignUpInput,
} from '../types';

export const authContextDefaultValue = {
	authToken: undefined,
	completeNewPasswordUser: false,
	onSignIn: async (_model: ISignInInput) => Promise.resolve(undefined),
	onSignUp: async (_model: ISignUpInput) => Promise.resolve({ message: '' }),
	onForgotPassword: async (_model: IForgotPasswordInput) => Promise.resolve({ message: '' }),
	onResetPassword: async (_model: IResetPasswordInput) => Promise.resolve({ message: '' }),
	onCompleteNewPassword: (_model: ICompleteNewPasswordInput) => Promise.resolve({ message: '' }),
	onChangePassword: (_model: IChangePasswordInput) => Promise.resolve({ message: '' }),
	onFederatedSignIn: async (_customProvider: unknown) => undefined,
	onSignOut: () => Promise.resolve(undefined),
} as IAccessControlContext;
