import { memo, useRef } from 'react';

import { useOnClickOutside } from '@react-coolkit/core';

import { Components } from './components';
import { ISidenavProps } from './types';
import { useLayoutContext } from '../../../../context';
import { INavItem, Orientation } from '../../../../types';
import { Brand } from '../Brand';
import { SidenavToggle as SidenavToggleIcon } from '../Icons';
import { Menu } from '../Menu';

export const Sidenav = memo((props: ISidenavProps) => {
	const { footer } = props;
	const { sidenavActive, toggleSidenav, settings, metadata, smallScreen, fixedSidenav, profile, navigation } = useLayoutContext();
	const ref = useRef(null);

	const elevation = smallScreen
		? settings.sideNav.elevationOnSmallScreen
		: settings.sideNav.elevation;

	useOnClickOutside(ref, () => {
		if (sidenavActive && smallScreen && !fixedSidenav) {
			toggleSidenav();
		}
	});

	if (!navigation?.sideNav?.length) {
		return null;
	}

	return (
		<Components.Wrapper
			id="layout-sidenav"
			elevation={elevation}
			ref={ref}
		>
			<Components.Header.Wrapper>
				<Components.Brand.Wrapper>
					<Brand {...metadata} />
				</Components.Brand.Wrapper>
				{!fixedSidenav
					? (
							<Components.Header.Close>
								<SidenavToggleIcon
									active={sidenavActive}
									onClick={() => toggleSidenav()}
								/>
							</Components.Header.Close>
						)
					: null
				}
			</Components.Header.Wrapper>
			<Components.Profile.Wrapper>
				{profile}
			</Components.Profile.Wrapper>
			<Components.SideNav>
				<Menu
					nav={navigation?.sideNav as INavItem[]}
					orientation={Orientation.Vertical}
					allowOpenMultiple={true}
					trigger={settings.sideNav.menuTrigger}
				/>
			</Components.SideNav>
			<Components.Footer sidenavActive={sidenavActive}>
				{footer}
			</Components.Footer>
		</Components.Wrapper>
	);
});
