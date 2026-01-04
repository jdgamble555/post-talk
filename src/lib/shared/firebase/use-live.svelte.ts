import { onSnapshot } from 'firebase/firestore';
import type { FirebaseError } from 'firebase/app';
import { dataConverter } from './use-doc.svelte';
import { dev } from '$app/environment';

export const useLive = <T>(type: Parameters<typeof onSnapshot>[0]) => {
	const live = $state<{
		current: {
			data: T[];
			loading: boolean;
			error: FirebaseError | Error | null;
		};
	}>({
		current: { data: [], loading: true, error: null }
	});

	$effect(() => {
		return onSnapshot(
			type.withConverter<T>(dataConverter),
			(q) => {
				if (q.empty) {
					live.current = {
						loading: false,
						data: [],
						error: null
					};
				}

				const data = q.docs.map((doc) => {
					const data = doc.data({
						serverTimestamps: 'estimate'
					});
					return data;
				});

				if (dev) {
					console.log(data);
				}

				live.current = {
					loading: false,
					data,
					error: null
				};
			},
			(error) => {
				// Handle error
				live.current = {
					loading: false,
					data: [],
					error
				};
			}
		);
	});
	return live;
};
