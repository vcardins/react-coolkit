import { useCallback, useState } from 'react';

import { buildLocalCache } from './LocalCache';
import { CacheLocation } from './types';

export interface IUseLocalCache<T> {
	type?: CacheLocation;
	cacheKey: string;
	initialValue?: Partial<T>;
	transform?: (value: T) => T;
}

export function useCache<T = unknown>(props: IUseLocalCache<T>): [
	T,
	(value: unknown, removeIfUndefined?: boolean) => void,
	() => void
] {
	const { type = CacheLocation.LocalStorage, cacheKey, initialValue, transform  } = props;
	const cache = buildLocalCache(type);

	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setValue] = useState(() => {
		try {
			// Get from local storage by key
			let item: T | string | null = cache.get(cacheKey);

			if (!item) {
				return initialValue as T;
			}

			item = JSON.parse(item) as T;

			return (typeof transform === 'function')
				? transform(item) as T
				: item;
		}
		catch (error) {
			// If error also return initialValue
			return initialValue as T;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to cache.
	const setStoredValue = useCallback((value: unknown, removeIfUndefined = false) => {
		try {
			if (!value && removeIfUndefined) {
				return cache.remove(cacheKey);
			}
			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function
				? value(storedValue)
				: value;

			// Save state
			setValue(valueToStore);
			// Save to local storage
			cache.set(cacheKey, valueToStore);
		}
		catch (error) {
			// A more advanced implementation would handle the error case
		}
	}, [cacheKey, storedValue]);

	const clearStoredValue = useCallback(() => {
		cache.remove(cacheKey);
	}, [cacheKey]);

	return [
		storedValue,
		setStoredValue,
		clearStoredValue,
	];
}
