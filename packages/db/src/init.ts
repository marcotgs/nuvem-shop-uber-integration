import { Firestore } from '@google-cloud/firestore';

const getFirestoreInstance = () => {
	let firestore: Firestore;

	return () => {
		if (!firestore) {
			firestore = new Firestore({ ignoreUndefinedProperties: true });
		}
		return firestore;
	};
};

export const initFirestore = getFirestoreInstance();
