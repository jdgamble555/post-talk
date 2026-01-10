import {
	GoogleAuthProvider,
	signInWithPopup,
	reauthenticateWithPopup,
	signOut,
	updateProfile as updateAuthProfile,
	updateEmail as updateAuthEmail,
	unlink,
	linkWithPopup
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

	const reLoginWithGoogle = async () => {
		const _user = auth.currentUser;
		if (!_user) {
			throw 'No user!';
		}
		try {
			const user = await reauthenticateWithPopup(
				_user,
				new GoogleAuthProvider()
			);
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
				if (e.code === 'auth/requires-recent-login') {
					const providers = user.providerData.map((p) => p.providerId);
					
					if (!providers.includes('google.com')) {
						return {
							error: e
						};
					}
					const { error: reauthError } = await reLoginWithGoogle();
					if (reauthError) {
						return {
							error: reauthError
						};
					}
					return {
						error: null
					};
				}
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

	const addProvider = async (providerId: string) => {
		const user = auth.currentUser;
		if (!user) {
			throw 'No user!';
		}
		try {
			if (providerId === 'google.com') {
				// Add other providers here as needed
				await linkWithPopup(
					user,
					new GoogleAuthProvider()
				);
			}
			return {
				error: null
			};
		} catch(e) {
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

	const removeProvider = async (providerId: string) => {
		const user = auth.currentUser;
		if (!user) {
			throw 'No user!';
		}
		try {
			await unlink(user, providerId);
			return {
				error: null
			};
		} catch(e) {
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
		updateEmail,
		addProvider,
		removeProvider
	};
};
