import { Dots, Linear, Spinner } from './components';
import { ILoadingProps, LoadingType } from './types';

export const Loading = ({
	type = LoadingType.Dots,
	...rest
}: ILoadingProps) => {
	switch (type) {
		case LoadingType.Spinner:
			return <Spinner {...rest} />;
		case LoadingType.Linear:
			return <Linear {...rest} />;
		default:
			return <Dots {...rest} />;
	}
};
