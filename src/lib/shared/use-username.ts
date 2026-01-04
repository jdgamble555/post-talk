import { useFirebase } from './firebase/use-firebase';
import { useFunctions } from './firebase/use-functions';
import { useDoc } from './firebase/use-doc.svelte';

export const useUsername = () => {
	const { auth } = useFirebase();
	const { getDocument } = useDoc();
	const { callFunction } = useFunctions();

	const setUsername = async (username: string) => {
		const { data, error } = await callFunction<
			{ username: string },
			{ changed: boolean }
		>('setUsername', {
			username
		});
		if (data?.changed) {
			// refresh custom claims
			await auth.currentUser?.getIdToken(true);
		}
		return { data, error };
	};

	const usernameAvailable = async (username: string) => {
		const { data, error: getDocError } = await getDocument(
			`usernames/${username}`
		);

		if (getDocError) {
			return {
				available: false,
				error: getDocError
			};
		}

		const exists = !!data;

		return {
			available: !exists,
			error: null
		};
	};

	return { setUsername, usernameAvailable };
};
