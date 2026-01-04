import { onAuthStateChanged, type User } from 'firebase/auth';
import { setupFirebase } from './use-firebase';
import { convertUser } from './use-user.svelte';
import { redirect } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';
import { dataConverter } from './converter';
import { FirebaseError } from 'firebase/app';

export const getUser = async () => {
	const { auth } = setupFirebase();

	const user = await new Promise<User | null>((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			async (user) => {
				unsubscribe();
				resolve(user);
			},
			reject
		);
	});

	if (!user) return null;

	return await convertUser(user);
};

export const getProfile = async () => {
	const { auth, db } = setupFirebase();

	if (!auth.currentUser) {
		redirect(302, '/login');
	}

	try {
		const userRef = doc(
			db,
			`users/${auth.currentUser.uid}`
		).withConverter<UserDoc>(dataConverter);

		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) {
			return {
				data: null,
				error: null
			};
		}
		return {
			data: userSnap.data(),
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
