import { ApiClient } from './lib/types';
import * as auth from './auth';

export const apiClient = (options?: ApiClient) => {
	return {
		auth,
	};
};
