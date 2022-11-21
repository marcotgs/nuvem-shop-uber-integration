type Spread<T1, T2> = {
	[Property in keyof T1]: T1[Property];
} & T2;

interface NuvemResponseData {
	id: number;
	created_at?: string;
	updated_at?: string;
	deleted_at?: string;
}
export interface NuvemApiClient {
	storeId?: string;
	storeToken?: string;
}

export type NuvemResponse<T> = Spread<T, NuvemResponseData>;
