import { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';

export interface IFramesetContentProps extends HTMLAttributes<HTMLDivElement>, Pick<CSSProperties, 'margin' | 'overflow'> {
	autoWidth?: boolean;
}

export interface IFramesetProps {
	id?: string;
	header?: {
		Icon?: ReactElement;
		title: ReactElement | string;
		titleVariant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
		iconSize?: 'inherit' | 'large' | 'medium' | 'small' | number;
		subTitle?: string;
		toolbar?: ReactNode;
	};
	footer?: ReactElement | string;
	contentProps?: IFramesetContentProps;
}
