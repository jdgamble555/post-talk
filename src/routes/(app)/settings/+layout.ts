import { browser } from '$app/environment';
import { getUser } from '$lib/shared/firebase/get-user';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
    if (!browser) {
        return;
    }

    // Login guard can be slow
    const user = await getUser();

    if (!user) {
        redirect(302, '/login');
    }

    if (!user.username) {
        redirect(302, '/username');
    }

    return;
};