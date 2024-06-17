import { ChangeEvent, isValidElement, memo, useCallback, useMemo, useRef } from 'react';

import { useOnClickOutside } from '@react-coolkit/core';

import {
	SubMenu as BaseSubMenu,
	Div,
	HorizontalNavigation,
	MenuItem,
	MenuItemCheckbox,
	MenuItemIcon,
	MenuItemLabel,
	MenuItemLink,
	MenuItemTitle,
	VerticalNavigation,
} from './components';
import { IMenuProps } from './types';
import { useLayoutContext } from '../../../../context';
import { INavItem, Orientation } from '../../../../types';

export interface IMenuEntryProps extends INavItem {
	level: number;
	trigger: IMenuProps['trigger'];
}

const getMenuItemCheckboxes = (node?: ParentNode | null | undefined) =>
	node?.querySelectorAll<HTMLInputElement>('[role="menuitemcheckbox"]');

/**
 * Handles the selection of an item.
 * @param event - The change event triggered by the input element.
 */
const handleItemSelect = ({ target }: ChangeEvent<HTMLInputElement>, allowOpenMultiple: boolean) => {
	// Get the parent node of the input element
	const parentNode = target.parentNode?.parentNode;

	// Select all input elements inside the parent node
	const checkboxes = getMenuItemCheckboxes(parentNode);

	if (!parentNode?.contains(target)) {
		return;
	}

	// Loop through each checkbox
	checkboxes?.forEach((checkbox) => {
		// Uncheck the checkbox if it is not the target element
		if ((target !== checkbox) && !allowOpenMultiple) {
			checkbox.checked = false;
		}
	});
};


const getMenuEntry = (allowOpenMultiple: boolean) => {
	const MenuEntry = memo(
		(props: IMenuEntryProps) => {
			const {
				id,
				level,
				label,
				Icon,
				url = '',
				items = [],
				trigger = 'hover',
			} = props;
			const { navigate } = useLayoutContext();

			const SubMenu = items.length > 0 ? BaseSubMenu : Div;

			const handleClick = useCallback(() => {
				if (!items.length) {
					navigate(url);
				}
			}, [items.length, navigate, url]);

			const inputId = `menu-checkbox-${id}`;

			return (
				<MenuItem id={id} role={items.length > 0 ? 'menuitem' : undefined}>
					<MenuItemCheckbox
						type="checkbox"
						id={inputId}
						role="menuitemcheckbox"
						onChange={(e) => handleItemSelect(e, allowOpenMultiple)}
					/>
					<MenuItemLabel htmlFor={inputId}>
						<MenuItemLink
							level={level}
							onClick={handleClick}
							role="link"
						>
							<MenuItemIcon>{Icon}</MenuItemIcon>
							<MenuItemTitle>{label}</MenuItemTitle>
						</MenuItemLink>
					</MenuItemLabel>
					<SubMenu role="menu">
						{items.map((item) => (
							<MenuEntry
								key={item.id}
								level={level + 1}
								trigger={trigger}
								{...item}
							/>
						))}
					</SubMenu>
				</MenuItem>
			);
		},
	);

	return MenuEntry;
};

export const Menu = memo((props: IMenuProps) => {
	const { nav, orientation, allowOpenMultiple = false, trigger } = props;
	const ref = useRef<HTMLUListElement>(null);

	const Container =
		orientation === Orientation.Vertical
			? VerticalNavigation
			: HorizontalNavigation;

	const MenuEntry = getMenuEntry(allowOpenMultiple);

	useOnClickOutside(ref, () => {
		const checkboxes = getMenuItemCheckboxes(ref.current);

		checkboxes?.forEach((checkbox) => {
			checkbox.checked = false;
		});
	});

	const menu = useMemo(() => {
		if (isValidElement(nav)) {
			return nav;
		}

		if (Array.isArray(nav)) {
			return nav.map((item, index) => (
				<MenuEntry
					key={item.id ?? index}
					{...item}
					level={0}
					trigger={trigger}
				/>
			));
		}

		return null;
	}, [nav, MenuEntry, trigger]);

	return (
		<Container
			ref={ref}
			trigger={trigger}
		>
			{menu}
		</Container>
	);
});
