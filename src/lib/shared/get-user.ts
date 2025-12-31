import { onAuthStateChanged, type User } from 'firebase/auth';
import { setupFirebase } from './use-firebase';

export const getUser = async () => {
	const { auth } = setupFirebase();

	return new Promise<User | null>((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			async (user) => {
				unsubscribe();
				if (!user) {
					return resolve(null);
				}
				resolve(user);
			},
			reject
		);
	});
};
