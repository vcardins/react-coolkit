import { ReactElement } from 'react';

import { Center, IconWrapper, Message, Title } from './styles';
import { appRoutes } from '../../config';

type IErrorProps = {
	code: string;
	title?: string;
	message: string;
	Icon: ReactElement | string;
};

export const Error = ({ code, Icon = '😭', title = 'Ooooops!', message }: IErrorProps) => (
	<Center id={`error-${code}`}>
		<IconWrapper>
			{Icon}
		</IconWrapper>
		<Title>{title}</Title>
		<Message>{message}</Message>
		<a href={appRoutes.Home}>Return to Home</a>
	</Center>
);
