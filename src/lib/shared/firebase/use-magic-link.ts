import { FirebaseError } from 'firebase/app';
import {
	isSignInWithEmailLink,
	sendSignInLinkToEmail,
	signInWithEmailLink
} from 'firebase/auth';
import { useFirebase } from './use-firebase';

export const useMagicLink = () => {
	const { auth } = useFirebase();

	const isMagicLinkURL = (url: string) => {
		return isSignInWithEmailLink(auth, url);
	};

	const signInWithMagic = async (url: URL) => {
        const email = url.searchParams.get('email');
        if (!email) {
            return {
                data: null,
                error: new Error('No email provided in URL')
            };
        }
		try {
			const user = await signInWithEmailLink(auth, email, url.href);
			return {
				data: user,
				error: null
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

	const sendMagicLink = async (email: string, returnUrl: string) => {
        const fullUrl = returnUrl + '?email=' + encodeURIComponent(email);
		try {
			await sendSignInLinkToEmail(auth, email, {
				handleCodeInApp: true,
				url: fullUrl
			});
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

	return {
		isMagicLinkURL,
		signInWithMagic,
		sendMagicLink
	};
};
