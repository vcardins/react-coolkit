import { memo, useCallback, useState } from 'react';

import { ISignInInput, useAccessControlContext } from '@react-coolkit/auth';

import { Container, ErrorMessage, Field } from './components';

const IDS = {
	FORM_SIGNIN: 'form-signin',
	INPUT_SIGNIN_EMAIL: 'input-signin-email',
	INPUT_SIGNIN_PASSWORD: 'input-signin-password',
	MESSAGE_AUTH_ERROR: 'message-auth-error',
	BUTTON_SIGNIN_SUBMIT: 'button-signin-submit',
};

const SignIn = memo(() => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<ISignInInput>({ email: '', password: '' });
	const [error, setError] = useState<string | null>(null);

	const { onSignIn } = useAccessControlContext();

	const handleFieldChange = useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { name, value } = e.currentTarget;

		setData((prevState) => ({
			...prevState,
			[name]: value,
		}));

		if (error) {
			setError(null);
		}
	}, [error]);

	const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			if (!data.password || !data.email) {
				setError('User name and password are required');

				return;
			}

			setLoading(true);

			await onSignIn(data);
		}
		catch (e) {
			setError((e as Error).message);
		}
		finally {
			setLoading(false);
		}
	}, [data, onSignIn]);

	return (
		<Container>
			<h2>Sign In</h2>
			<form
				id={IDS.FORM_SIGNIN}
				onSubmit={handleSubmit}
			>
				<Field>
					<label htmlFor="email">Email</label>
					<input
						id={IDS.INPUT_SIGNIN_EMAIL}
						type="text"
						name="email"
						onChange={handleFieldChange}
						disabled={loading}
					/>
				</Field>
				<Field>
					<label htmlFor="password">Password</label>
					<input
						id={IDS.INPUT_SIGNIN_PASSWORD}
						type="password"
						name="password"
						onChange={handleFieldChange}
						disabled={loading}
					/>
				</Field>
				{error ? <ErrorMessage id={IDS.MESSAGE_AUTH_ERROR}>{error}</ErrorMessage> : null}
				<div>
					<button
						id={IDS.BUTTON_SIGNIN_SUBMIT}
						type="submit"
						disabled={loading}
					>
						Sign In
					</button>
				</div>
			</form>
		</Container>
	);
});

SignIn.displayName = 'SignIn';

export default SignIn;
