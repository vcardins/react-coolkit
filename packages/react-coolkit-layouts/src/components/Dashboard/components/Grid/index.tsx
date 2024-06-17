import { Wrapper } from './components';
import { IGridProps } from './types';
import { useLayoutContext } from '../../../../context';

export const Grid = ({ children }: IGridProps) => {
	const { sidenavActive, navigation, fixedSidenav } = useLayoutContext();
	const dataAttrs = navigation?.sideNav?.length && !fixedSidenav
		? { 'data-sidenav-active': sidenavActive }
		: {};

	return (
		<Wrapper
			id="layout-container"
			{...dataAttrs}
		>
			{children}
		</Wrapper>
	);
};
