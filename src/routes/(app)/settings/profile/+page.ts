import { browser } from '$app/environment';
import { getProfile } from '$lib/shared/firebase/get-user';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	if (!browser) {
		return;
	}

	await parent();

	const { data: profile, error: profileError } = await getProfile();

	if (profileError) {
		error(500, profileError.message);
	}

    if (!profile) {
        error(404, 'Profile not found');
    }

	return { profile };
};
