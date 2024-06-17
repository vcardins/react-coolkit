import axios, { AxiosError, AxiosResponse } from 'axios';

export class AxiosInterceptorPlugin {
	constructor (onApiError: (error: AxiosError) => Promise<void>, onSignOut?: () => void) {
		// 	// Add your interceptors here
		axios.interceptors.request.use(
			(config) =>
				// Modify the request configuration before it's sent
				// You can add headers, tokens, or perform other actions here
				config
			,
			async (error: AxiosError) => {
				await onApiError(error);
				onSignOut?.();

				return Promise.reject(error as Error);
			},
		);

		axios.interceptors.response.use(
			(response: AxiosResponse<any, any>) =>
				// Modify the response data before it's returned
				response
			,
			async (error: AxiosError) => {
				await onApiError(error);
				onSignOut?.();

				return Promise.reject(error as Error);
			},
		);
	}
}
