import { UserProfile } from './UserProfile';

export interface ISignUpResult<IUserProfile = typeof UserProfile> {
	user: IUserProfile;
	userConfirmed: boolean;
}
