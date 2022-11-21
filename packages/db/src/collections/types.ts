type Spread<T1, T2> = {
	[Property in keyof T1]: T1[Property];
} & T2;

interface DBMeta {
	docId: string;
	updatedAt?: string;
	createdAt?: string;
}

interface DBMetadata {
	meta?: DBMeta;
}


export type DBDoc<T> = Spread<T, DBMetadata>;
