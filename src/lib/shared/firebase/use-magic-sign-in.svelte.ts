import { useMagicLink } from './use-magic-link';
import { page } from '$app/state';
import { toast } from 'svelte-sonner';

export const useMagicSignIn = () => {
	const { isMagicLinkURL, signInWithMagic } = useMagicLink();

	const signIn = async (url: URL) => {
		const { error: signInError } = await signInWithMagic(url);
		if (signInError) {
			toast.error(signInError.message);
		}
	};

	$effect(() => {
		const url = page.url;
		if (isMagicLinkURL(url.href)) {
			signIn(url);
		}
	});
};