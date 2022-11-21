import * as auth from './auth';
import * as shipping from './shipping';

export const apiClient = () => {
	return {
		auth,
		...shipping,
	};
};

export * from './auth/types';
export * from './shipping/types';
