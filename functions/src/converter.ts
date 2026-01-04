import { DocumentData, FirestoreDataConverter } from 'firebase-admin/firestore';

export const converter = <T extends DocumentData>(): FirestoreDataConverter<T> => ({
	toFirestore: (data) => data,
	fromFirestore: (snap) => snap.data() as T
});
