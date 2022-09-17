import { initFirestore } from '../init';
import { Account } from './types';

const firestore = initFirestore();

export const addAccount = async (account: Account) => {
	await firestore.collection('accounts').add(account);
};
