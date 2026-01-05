import { useAuth } from './use-auth';
import { useDoc } from './use-doc.svelte';
import { useFirebase } from './use-firebase';

export const useProfile = () => {
	const { auth } = useFirebase();

	const { 
		updateProfile: updateUserProfile,
		updateEmail: updateUserEmail
	} = useAuth();

	const { setDocument, getDocument } = useDoc();

	const updateProfile = async (displayName: string, bio: string) => {
		if (!auth.currentUser) {
			throw 'No User';
		}

		const { error: updateError } = await updateUserProfile({ displayName });

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

	const updateEmail = async (newEmail: string) => {
		if (!auth.currentUser) {
			throw 'No User';
		}

		const { error: updateError } = await updateUserEmail(newEmail);

		return { error: updateError };
	};

	const getProfile = async () => {
		if (!auth.currentUser) {
			throw 'No User';
		}
		return await getDocument<UserDoc>(`users/${auth.currentUser.uid}`);
	};

	return { updateProfile, updateEmail, getProfile };
};
