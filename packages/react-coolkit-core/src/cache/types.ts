export interface ILocalCache {
	get(key: string, initialValue?: unknown): string;
	set(key: string, value: any, removeIfUndefined?: boolean): void;
	set(key: string, value: any, time?: any): void;
	remove(key: string): void;
}

export enum CacheLocation {
	LocalStorage = 1,
	SessionStorage = 2,
	Cookie = 3,
}
