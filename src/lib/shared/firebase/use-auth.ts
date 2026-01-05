import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	updateProfile as updateAuthProfile,
	updateEmail as updateAuthEmail
} from 'firebase/auth';
import { useFirebase } from './use-firebase';
import { FirebaseError } from 'firebase/app';

export const useAuth = () => {
	const { auth } = useFirebase();

	const loginWithGoogle = async () => {

		try {
			const user = await signInWithPopup(auth, new GoogleAuthProvider());
			return {
				error: null,
				data: user
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

	const logout = async () => {
		return await signOut(auth);
	};

	const updateEmail = async (newEmail: string) => {
		const user = auth.currentUser;
		if (!user) {
			throw 'No user!';
		}
		try {
			await updateAuthEmail(auth.currentUser, newEmail);
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

	const updateProfile = async ({
		displayName,
		photoURL
	}: {
		displayName?: string;
		photoURL?: string;
	}) => {
		const user = auth.currentUser;
		if (!user) {
			throw 'No user!';
		}
		try {
			await updateAuthProfile(auth.currentUser, { displayName, photoURL });
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
		loginWithGoogle,
		logout,
		updateProfile,
		updateEmail
	};
};
