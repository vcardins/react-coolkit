import { FooterWrapper } from './components';
import { IFooterProps } from './types';

export const Footer = ({ children }: IFooterProps) => (
	<FooterWrapper>
		{children}
	</FooterWrapper>
);
