import { onIdTokenChanged, type User } from 'firebase/auth';
import { onDestroy } from 'svelte';
import { rune } from '../rune.svelte';
import { useSharedContext } from '../use-shared-context';
import { useFirebase } from './use-firebase';

export const convertUser = async (user: User) => {
	const { displayName, photoURL, uid, email } = user;
	const tokenResult = await user.getIdTokenResult();
	const username = tokenResult.claims?.username as string | undefined;
	return { displayName, photoURL, uid, email, username };
};

const _useUser = () => {
	const { auth } = useFirebase();

	const user = rune<{
		loading: boolean;
		data: UserType | null;
		error: Error | null;
	}>({
		loading: true,
		data: null,
		error: null
	});

	const unsubscribe = onIdTokenChanged(
		auth,
		(_user: User | null) => {
			// not logged in
			if (!_user) {
				user.current = {
					loading: false,
					data: null,
					error: null
				};
				return;
			}

			// logged in
			convertUser(_user).then(
				(data) => {
					user.current = {
						loading: false,
						data,
						error: null
					};
				}
			);
		},
		(error) => {
			// error
			user.current = {
				loading: false,
				data: null,
				error
			};
		}
	);

	onDestroy(unsubscribe);

	return user;
};

export const useUser = () => useSharedContext('user', _useUser);
