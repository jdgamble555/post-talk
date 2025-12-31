import { browser } from '$app/environment';
import { getUser } from '$lib/shared/get-user';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {

    if (!browser) {
        return; 
    }

    // Login guard can be slow
    const user = await getUser();

    if (user) {
        redirect(302, '/home');
    }

	return;
};

