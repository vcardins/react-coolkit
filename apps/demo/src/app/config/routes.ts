import { PageKey } from '../types';

const keys = Object.keys(PageKey);
const values = Object.values(PageKey);

export const appRoutes = values.reduce((result, value) => {
	const key = keys[values.indexOf(value)];
	const url = value === PageKey.Home ? '' : value;

	result[key as keyof typeof PageKey] = `/${url}`;

	return result;
}, {} as Record<keyof typeof PageKey, string>);
