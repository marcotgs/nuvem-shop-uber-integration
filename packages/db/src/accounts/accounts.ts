import { initFirestore } from '../init';
import { IAccount } from './types';

const firestore = initFirestore();

const getCollectionRef = () => {
	const collectionName = 'accounts';
	return firestore.collection(collectionName);
}

export const addAccount = async (account: IAccount) => {
	await getCollectionRef().add(account);
};

export const findAccountByUserId = async (userId: string) => {
	await getCollectionRef().where('userId', '==', userId).get();
};
