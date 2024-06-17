import { ChangeEvent, KeyboardEvent, memo, useCallback, useState } from 'react';

import { Components } from './components';
import { IHeaderProps } from './types';
import { useLayoutContext } from '../../../../context';
import { INavItem, Orientation } from '../../../../types';
import { Brand } from '../Brand';
import { SidenavToggle as SidenavToggleIcon, SignOut as SignOutIcon } from '../Icons';
import { Menu } from '../Menu';

export const Header = memo(({ search }: IHeaderProps) => {
	const [searchText, setSearchText] = useState('');
	// const [dropdownActive, setToggleDropdown] = useState(false);
	const { sidenavActive, toggleSidenav, fixedSidenav, metadata, settings, navigation, onSignOut } = useLayoutContext();

	const handleChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.currentTarget.value);
	}, []);

	const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && searchText.length) {
			search?.onSubmit?.(searchText);
		}
	}, [search, searchText]);

	// const handleToggleMenu = useCallback((e: MouseEvent<HTMLDivElement>) => {
	// 	e.preventDefault();
	// 	setToggleDropdown((prevState) => !prevState);
	// }, []);

	const displaySidenav = (navigation?.sideNav?.length && !sidenavActive && !fixedSidenav);

	return (
		<Components.Wrapper id="layout-header">
			<Components.Slots.Left>
				{(!navigation?.sideNav?.length || !sidenavActive)
					? (
							<Components.BrandWrapper>
								<Brand {...metadata} />
							</Components.BrandWrapper>
						)
					: null
				}
				{displaySidenav
					? (
							<SidenavToggleIcon
								onClick={() => toggleSidenav()}
								active={sidenavActive}
							/>
						)
					: null
				}
			</Components.Slots.Left>
			<Components.Slots.Center>
				{search
					? (
							<Components.Search>
								<Components.SearchInput
									id={search.id}
									value={searchText}
									placeholder={search.placeholder}
									onChange={handleChangeSearch}
									onKeyDown={handleKeyDown}
								/>
							</Components.Search>
						)
					: null
				}
				<Menu
					nav={navigation?.topNav as INavItem[]}
					orientation={Orientation.Horizontal}
					trigger={settings.header.menuTrigger}
				/>
			</Components.Slots.Center>
			<Components.Slots.Right>
				{typeof onSignOut === 'function'
					? (
							<SignOutIcon onClick={onSignOut} tooltip="Sign Out" />
						)
					: null
				}
			</Components.Slots.Right>
		</Components.Wrapper>
	);
});
