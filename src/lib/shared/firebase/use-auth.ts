import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	updateProfile as updateAuthProfile
} from 'firebase/auth';
import { useFirebase } from './use-firebase';
import { FirebaseError } from 'firebase/app';

export const useAuth = () => {
	const { auth } = useFirebase();

	const loginWithGoogle = async () => {
		return await signInWithPopup(auth, new GoogleAuthProvider());
	};

	const logout = async () => {
		return await signOut(auth);
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
		updateProfile
	};
};
