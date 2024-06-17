export interface ISignUpInput<IAttributes = object> {
	email: string;
	username?: string;
	password: string;
	attributes?: IAttributes;
}
