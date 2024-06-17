import { css } from '@emotion/react';
import styled from '@emotion/styled';

const HeaderWrapper = styled.header`
	grid-area: header;
	display: flex;
	gap: var(--header-padding);
	align-items: center;
	justify-content: space-between;
	z-index: 1;
	padding: 0 var(--header-padding);
	box-shadow: rgba(0, 0, 0, 0.12) 0px calc(var(--header-elevation) * 2px) 2px -1px;
`;

const slots = css`
	display: flex;
	align-items: center;
`;

const SlotLeft = styled.div`
	${slots}
	justify-content: space-between;
	width: calc(var(--sidenav-extended-width) - var(--base-padding));
	color: var(--color-primary);
`;

const BrandWrapper = styled.div`
	${slots};
`;

const SlotCenter = styled.div`
	${slots};
	flex: 1;
`;

const SlotRight = styled.div`
	${slots};
	flex: 1;
	justify-content: flex-end;
`;

const Search = styled.div`
	margin-left: 55px;
	font-size: 20px;
	color: #777;
`;

const SearchInput = styled.input`
	border: none;
	background: transparent;
	padding: 12px;
	font-size: 20px;
	color: #777;
	&:focus {
		outline: none;
		border: none;
	}
`;

const AvatarWrapper = styled.div`

`;

const AvatarImage = styled.div`
	background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1609106/headshot.png");
	background-image: url("../../img/headshot.png");
	background-size: cover;
	background-repeat: no-repeat;
	border-radius: 50%;
	border: 2px solid rgba(255, 255, 255, 0.2);
	position: relative;
	margin: 0 20px;
	width: 35px;
	height: 35px;
	cursor: pointer;

	&:after {
		position: absolute;
		content: '';
		width: 6px;
		height: 6px;
		background: none;
		border-left: 2px solid #777;
		border-bottom: 2px solid #777;
		transform: rotate(-45deg) translateY(-50%);
		top: 50%;
		right: -18px;
	}
`;

const Dropdown = styled.div<{ active?: boolean }>`
	position: absolute;
	top: 54px;
	right: -16px;
	width: 220px;
	height: auto;
	z-index: 1;
	background-color: var(--color-paper);
	border-radius: 4px;
	visibility: hidden;
	opacity: 0;
	transform: translateY(-10px);
	transition: all .3s;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);

	${(props) => props.active
		? `
			visibility: visible;
			opacity: 1;
			transform: translateY(0);
		`
		: undefined
}

	&::before {
		position: absolute;
		content: "";
		top: -6px;
		right: 30px;
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-bottom: 6px solid var(--color-paper);
	}
`;

const DropdownList = styled.ul`
	margin: 0;
	padding: 0;
	list-style-type: none;
`;

const DropdownListItem = styled.li`
	padding: 12px 24px;
	color: #777;
	text-transform: capitalize;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

const DropdownListItemIcon = styled.span`
	color: #1BBAE1;
`;

const DropdownListItemTitle = styled.span`
	margin-left: 10px;
`;

export const Components = {
	Wrapper: HeaderWrapper,
	Search,
	SearchInput,
	BrandWrapper,
	Avatar: {
		Wrapper: AvatarWrapper,
		Image: AvatarImage,
		Dropdown,
		DropdownList,
		DropdownListItem,
		DropdownListItemIcon,
		DropdownListItemTitle,
	},
	Slots: {
		Left: SlotLeft,
		Center: SlotCenter,
		Right: SlotRight,
	},
};
