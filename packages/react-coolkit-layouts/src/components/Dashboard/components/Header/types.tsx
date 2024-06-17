import { ReactElement, ReactNode } from 'react';

export interface IHeaderProps extends React.PropsWithChildren<any> {
	search?: {
		id?: string;
		placeholder: string;
		onSubmit: (text: string) => void;
	};
	avatar?: {
		image: ReactNode;
		menu?: {
			id?: string;
			icon?: ReactElement;
			title: string;
			onClick: React.MouseEventHandler<HTMLLIElement>;
		}[];
	};
}
