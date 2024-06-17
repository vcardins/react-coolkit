import { ReactElement } from 'react';

export interface IMetadata {
	name: string;
	shortName: string;
	description?: string;
	keywords?: string;
	version?: string;
	Logo?: (pros: { size?: number }) => ReactElement;
	icons?: IMetadataIcon[];
}

export interface IMetadataIcon {
	src: string;
	sizes: string;
	type: string;
}
