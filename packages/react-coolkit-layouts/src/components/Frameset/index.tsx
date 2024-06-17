import { PropsWithChildren } from 'react';

import { Container, Content, Footer, Header } from './components';
import { IFramesetProps } from './types';
// import { getIcon } from '../utils';

export const Frameset = (props: PropsWithChildren<IFramesetProps>) => {
	const { id, contentProps, children } = props;
	let header = null;
	let footer = null;

	if (props.header) {
		const { title, toolbar/*, ...rest*/ } = props.header;
		// const Icon = getIcon(rest.Icon);

		header = (
			<Header>
				<h2>
					{/* <Icon /> */}
					{typeof title === 'string' ? <span>{title}</span> : title}
				</h2>
				{toolbar}
			</Header>
		);
	}

	if (props.footer) {
		footer = (
			<Footer>
				{props.footer}
			</Footer>
		);
	}

	return (
		<Container id={id}>
			{header}
			<Content {...contentProps}>
				{children}
			</Content>
			{footer}
		</Container>
	);
};
