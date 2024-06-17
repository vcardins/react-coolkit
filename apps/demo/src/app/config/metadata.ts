import manifest from '../../manifest.json';

export const metadata = {
	description: manifest.description,
	icons: manifest.icons,
	name: manifest.name,
	shortName: manifest.short_name,
	version: process?.env?.['VERSION'],
};
