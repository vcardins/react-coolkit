import styled from '@emotion/styled';

export const Container = styled.section`
	display: flex;
	flex-direction: column;
`;

export const ErrorMessage = styled.div`
	border: 1px solid red;
	color: red;
	border-radius: 3px;
	margin: 1em 0;
	font-size: 13px;
	padding: 0.25em 0.75em;
`;

export const Field = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 20px;
	margin-bottom: 10px;
`;
