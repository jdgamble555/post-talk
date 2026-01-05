import {
	serverTimestamp,
	Timestamp,
	type QueryDocumentSnapshot,
	type SetOptions,
	type SnapshotOptions
} from 'firebase/firestore';

export const dataConverter = {
	toFirestore<T>(value: T, options?: SetOptions) {
		const isMerge = options && 'merge' in options;
		return {
			...value,
			[isMerge ? 'updatedAt' : 'createdAt']: serverTimestamp()
		};
	},
	fromFirestore<T>(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
		const data = snapshot.data(options);
		const createdAt = data.createdAt as Timestamp;
		const updatedAt = data?.updatedAt as Timestamp;

		return {
			...data,
			createdAt: createdAt?.toDate(),
			updatedAt: updatedAt?.toDate(),
			id: snapshot.id
		} as T;
	}
};
