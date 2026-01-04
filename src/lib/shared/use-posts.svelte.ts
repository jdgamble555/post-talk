import { collection, orderBy, query } from 'firebase/firestore';
import { useFirebase } from './firebase/use-firebase';
import { useDoc } from './firebase/use-doc.svelte';
import { useLive } from './firebase/use-live.svelte';

export const useAddPost = () => {
	const { auth } = useFirebase();
	const { newDocument } = useDoc();

	const addPost = async (text: string) => {
		const user = auth.currentUser;
		if (!user) {
			throw 'No user!';
		}

		return await newDocument('posts', {
			createdBy: user.uid,
			content: text
		});
	};

	return { addPost };
};

export const useDeletePost = () => {
	const { deleteDocument } = useDoc();

	const deletePost = async (id: string) => {
		return await deleteDocument(`posts/${id}`);
	};

	return { deletePost };
};

export const useUpdatePost = () => {
	const { setDocument } = useDoc();

	const updatePost = async (id: string, content: string) => {
		return await setDocument(`posts/${id}`, { content });
	};

	return { updatePost };
};

export const usePosts = () => {
	//const user = useUser();

	const { db } = useFirebase();

	const posts = useLive<PostType>(
		query(collection(db, 'posts'), orderBy('createdAt'))
	);

	return posts;
};
