import styled from '@emotion/styled';

import { IMetadata } from '../../../../types';

const BrandIcon = styled.div`
	margin-right: 10px;
	display: flex;
`;

const BrandName = styled.div`
	font-size: 18px;
	font-weight: bold;
`;


export const Brand = ({ name, Logo }: IMetadata) => (
	<>
		{Logo ? <BrandIcon><Logo size={32} /></BrandIcon> : null}
		{name ? <BrandName>{name}</BrandName> : null}
	</>
);
