// https://epicreact.dev/css-variables/
// https://blog.logrocket.com/create-better-themes-with-css-variables/

import { css } from '@emotion/react';

export const getStyles = (primary: string) => css`
	html, body {
		padding: 0;
		margin: 0;
		height: 100vh;
		width: 100vw;
		overflow: hidden;

		--color-primary: ${primary};
	}
`;
