import { useAuth } from './firebase/use-auth';
import { useDoc } from './firebase/use-doc.svelte';
import { useFirebase } from './firebase/use-firebase';

export const useProfile = () => {
	const { auth } = useFirebase();

	const { updateProfile } = useAuth();

	const { setDocument } = useDoc();

	const updateUserProfile = async (displayName: string, bio: string) => {
		if (!auth.currentUser) {
			throw 'No User';
		}

		const { error: updateError } = await updateProfile({ displayName });

		if (updateError) {
			return { error: updateError };
		}

		const { error: docError } = await setDocument(
			`users/${auth.currentUser.uid}`,
			{
				bio,
				displayName
			}
		);

		if (docError) {
			return { error: docError };
		}

        return {
            error: null
        };
	};

	return { updateUserProfile };
};
