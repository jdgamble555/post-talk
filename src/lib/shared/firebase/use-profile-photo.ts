import { useAuth } from './use-auth';
import { useDoc } from './use-doc.svelte';
import { useFirebase } from './use-firebase';
import { useUpload } from './use-upload.svelte';

export const useProfilePhoto = () => {
	const { auth } = useFirebase();
	const { uploadFile, status, deleteFile } = useUpload();
	const { updateProfile } = useAuth();
	const { setDocument } = useDoc();

	const uploadProfilePhoto = async (file: File) => {
		if (!auth.currentUser) {
			throw 'User not authenticated';
		}

		const oldPhotoURL = auth.currentUser.photoURL;

		const { error: uploadError, data: downloadURL } = await uploadFile(
			`profile-photos/${auth.currentUser.uid}`,
			file,
			{
				contentType: file.type,
				cacheControl: 'public, max-age=31536000, immutable'
			}
		);

		if (uploadError) {
			return {
				error: uploadError,
				data: null
			};
		}

		const { error: updateError } = await updateProfile({
			photoURL: downloadURL
		});

		if (updateError) {
			return {
				error: updateError,
				data: null
			};
		}

		const { error: docError } = await setDocument(
			`users/${auth.currentUser.uid}`,
			{ photoURL: downloadURL }
		);

		if (docError) {
			return {
				error: docError,
				data: null
			};
		}

		if (oldPhotoURL) {
			const { error: deleteError } = await deleteFile(oldPhotoURL);
			if (deleteError) {
				return {
					error: deleteError,
					data: null
				};
			}
		}

        // Force refresh the ID token to ensure the new photoURL is included
        await auth.currentUser.reload();

		return {
			error: null,
			data: downloadURL
		};
	};

    const removeProfilePhoto = async () => {
        if (!auth.currentUser) {
            throw 'User not authenticated';
        }

        const oldPhotoURL = auth.currentUser.photoURL;

        const { error: updateError } = await updateProfile({
            photoURL: ''
        });

        if (updateError) {
            return {
                error: updateError
            };
        }

        const { error: docError } = await setDocument(
            `users/${auth.currentUser.uid}`,
            { photoURL: null }
        );

        if (docError) {
            return {
                error: docError
            };
        }

        if (oldPhotoURL) {
            const { error: deleteError } = await deleteFile(oldPhotoURL);
            if (deleteError) {
                return {
                    error: deleteError
                };
            }
        }

        // Force refresh the ID token to ensure the new photoURL is included
        await auth.currentUser.reload();

        return { error: null };
    };

	return {
		uploadProfilePhoto,
        removeProfilePhoto,
		status
	};
};
