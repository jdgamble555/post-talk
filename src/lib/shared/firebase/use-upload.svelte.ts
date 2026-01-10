import {
	deleteObject,
	getDownloadURL,
	ref,
	StorageError,
	uploadBytesResumable,
	type TaskState,
	type UploadMetadata,
	type UploadTask
} from 'firebase/storage';
import { useFirebase } from './use-firebase';
import { collection, doc } from 'firebase/firestore';

export const useUpload = () => {
	const { storage, db } = useFirebase();

	const status = $state<{
		current: {
			progress: number | null;
			state: TaskState | null;
		};
	}>({
		current: {
			progress: null,
			state: null
		}
	});

	let uploadTask: UploadTask;

	const uploadFile = async (
		path: string,
		file: File,
		metadata?: UploadMetadata
	) => {
		const randomID = doc(collection(db, 'users')).id;

		uploadTask = uploadBytesResumable(
			ref(storage, `${path}/${randomID}-${file.name}`),
			file,
			metadata
		);

		return new Promise<
			{ error: StorageError; data: null } | { error: null; data: string }
		>((resolve, reject) => {
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// handle upload progress
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					status.current = {
						progress,
						state: snapshot.state
					};
				},
				(error) => {
					// error handling
					status.current = {
						progress: null,
						state: 'error'
					};
					reject({
						error,
						data: null
					});
				},
				() => {
					// success, get download URL
					getDownloadURL(uploadTask.snapshot.ref)
						.then((downloadURL) => {
							// set progress to 100%
							status.current = {
								progress: 100,
								state: 'success'
							};
							resolve({
								error: null,
								data: downloadURL
							});
						})
						.catch((error) => {
							reject({
								error,
								data: null
							});
						});
				}
			);
		});
	};

	const pauseUpload = () => {
		uploadTask?.pause();
	};

	const resumeUpload = () => {
		uploadTask?.resume();
	};

	const cancelUpload = () => {
		uploadTask?.cancel();
	};

	const deleteFile = async (path: string) => {
		const fileRef = ref(storage, path);

		try {
			await deleteObject(fileRef);
			return { error: null };
		} catch (error) {
			if (error instanceof StorageError) {
				return { error };
			}
			if (error instanceof Error) {
				return { error };
			}
			throw error;
		}
	};

	return {
		status,
		uploadFile,
		pauseUpload,
		resumeUpload,
		cancelUpload,
		deleteFile
	};
};
