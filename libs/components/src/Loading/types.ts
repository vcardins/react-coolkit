export enum LoadingType {
	Dots = 1,
	Linear = 2,
	Spinner = 3,
}

export interface ILoadingProps {
	id?: string;
	type?: LoadingType;
}
