import { HttpRequestMethod } from './types';

const httpRequestMethods = Object.values(HttpRequestMethod);

const buildHttpRequestMethod = (method: HttpRequestMethod) =>
	async <T>(resource: string, init: RequestInit = {}) => {
		const { ok, json, statusText } = await fetch(resource, { method, ...init });
		const result = await json();

		if (!ok) {
			throw new Error(result?.message ?? statusText);
		}
		else {
			return result as Promise<T>;
		}
	};

export const http = httpRequestMethods.reduce((result, method) => {
	result[method as HttpRequestMethod] = buildHttpRequestMethod(method as HttpRequestMethod);

	return result;
}, {} as Record<HttpRequestMethod, ReturnType<typeof buildHttpRequestMethod>>);
