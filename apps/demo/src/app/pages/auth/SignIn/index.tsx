import { IPageConfig, LayoutStyle } from '@react-coolkit/layouts';

import SignIn from './SignIn';
import { appRoutes } from '../../../config';
import { PageKey } from '../../../types';

export const SignInPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyle.Column,
	},
	routes: [
		{
			id: PageKey.SignIn,
			caseSensitive: true,
			path: appRoutes.SignIn,
			metadata: {
				title: 'Sign In',
			},
			element: <SignIn />,
		},
	],
};
