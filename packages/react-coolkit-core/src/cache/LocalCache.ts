import { CacheLocation, ILocalCache } from './types';

export function buildLocalCache(type: CacheLocation) {
	const storage = type === CacheLocation.LocalStorage
		? window.localStorage
		: window.sessionStorage;

	return {
		get(key: string, initialValue: unknown): unknown {
			try {
				// Get from local storage by key
				const item = storage.getItem(key);

				// Parse stored json or if none return initialValue
				return item ? JSON.parse(item) : initialValue;
			}
			catch (error) {
				// If error also return initialValue
				return initialValue;
			}
		},

		set(key: string, value: any, removeIfUndefined: boolean): void {
			try {
				if (!value && removeIfUndefined) {
					return storage.removeItem(key);
				}
				// Allow value to be a function so we have same API as useState
				const valueToStore = value instanceof Function
					? value(storage.getItem(key))
					: value;

				// Save to local storage
				storage.setItem(key, JSON.stringify(valueToStore));
			}
			catch (error) {
				// A more advanced implementation would handle the error case
			}
		},

		remove(key: string): void {
			storage.removeItem(key);
		},
	} as ILocalCache;
}
