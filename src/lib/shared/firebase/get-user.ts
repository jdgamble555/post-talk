import { onAuthStateChanged, type User } from 'firebase/auth';
import { setupFirebase } from './use-firebase';
import { convertUser } from './use-user.svelte';

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

	return convertUser(user);
};
