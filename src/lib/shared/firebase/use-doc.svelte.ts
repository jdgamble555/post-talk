import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	setDoc
} from 'firebase/firestore';
import { useFirebase } from './use-firebase';
import { FirebaseError } from 'firebase/app';
import { dataConverter } from './converter';

export const useDoc = () => {
	const { db } = useFirebase();

	const setDocument = async <T>(path: string, data: T) => {
		try {
			const docRef = doc(db, path).withConverter<T>(dataConverter);
			await setDoc(docRef, data, { merge: true });
			return {
				error: null
			};
		} catch (e) {
			if (e instanceof FirebaseError) {
				return {
					error: e
				};
			}
			if (e instanceof Error) {
				return {
					error: e
				};
			}
			throw e;
		}
	};

	const newDocument = async <T>(path: string, data: T) => {
		try {
			const collectionRef = collection(db, path).withConverter<T>(
				dataConverter
			);
			await addDoc(collectionRef, data);
			return {
				error: null
			};
		} catch (e) {
			if (e instanceof FirebaseError) {
				return {
					error: e
				};
			}
			if (e instanceof Error) {
				return {
					error: e
				};
			}
			throw e;
		}
	};

	const getDocument = async <T>(path: string) => {
		try {
			const docRef = doc(db, path).withConverter<T>(dataConverter);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				return {
					data: docSnap.data(),
					error: null
				};
			}

			return {
				data: null,
				error: null
			};
		} catch (e) {
			if (e instanceof FirebaseError) {
				return {
					data: null,
					error: e
				};
			}
			if (e instanceof Error) {
				return {
					data: null,
					error: e
				};
			}
			throw e;
		}
	};

	const deleteDocument = async (path: string) => {
		try {
			const docRef = doc(db, path);
			await deleteDoc(docRef);
			return {
				error: null
			};
		} catch (e) {
			if (e instanceof FirebaseError) {
				return {
					error: e
				};
			}
			if (e instanceof Error) {
				return {
					error: e
				};
			}
			throw e;
		}
	};

	return {
		setDocument,
		getDocument,
		newDocument,
		deleteDocument
	};
};
