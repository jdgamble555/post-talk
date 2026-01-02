import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    QueryDocumentSnapshot,
    serverTimestamp,
    setDoc,
    Timestamp,
    type PartialWithFieldValue,
    type SetOptions,
    type SnapshotOptions
} from "firebase/firestore";
import { useFirebase } from "./use-firebase";
import { FirebaseError } from "firebase/app";
import { useUser } from "./use-user.svelte";
import { rune } from "./rune.svelte";
import { untrack } from "svelte";
import { dev } from "$app/environment";


const postConverter = {
    toFirestore(value: PartialWithFieldValue<PostType>, options?: SetOptions) {
        const isMerge = options && 'merge' in options;
        return {
            ...value,
            [isMerge ? 'updatedAt' : 'createdAt']: serverTimestamp()
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ) {
        const data = snapshot.data(options);
        const createdAt = data.createdAt as Timestamp;
        return {
            ...data,
            id: snapshot.id,
            createdAt: createdAt.toDate()
        } as PostType;
    }
};

export const useAddPost = () => {

    const { db, auth } = useFirebase();

    const addPost = async (text: string) => {
        const user = auth.currentUser;
        if (!user) {
            throw 'No user!';
        }
        try {
            await setDoc(doc(collection(db, 'posts'))
                .withConverter(postConverter), {
                createdBy: user.uid,
                content: text
            });
        } catch (e) {
            if (e instanceof FirebaseError) {
                return {
                    error: e.message
                };
            }
            throw e;
        }
        return { error: null };
    };

    return { addPost };
};

export const useDeletePost = () => {

    const { db } = useFirebase();

    const deletePost = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'posts', id));
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.error(e);
                return {
                    error: e.message
                };
            }
            throw e;
        }
        return { error: null };
    };

    return {
        deletePost
    };
}


export const useUpdatePost = () => {

    const { db } = useFirebase();

    const updatePost = async (
        id: string,
        content: string
    ) => {
        try {
            await setDoc(
                doc(db, 'posts', id),
                { content },
                { merge: true }
            );
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.error(e);
                return {
                    error: e.message
                };
            }
            throw e;
        }
        return { error: null };
    };

    return {
        updatePost
    };
}

export const usePosts = () => {

    const user = useUser();

    const { db } = useFirebase();

    const posts = rune<{
        data: PostType[],
        loading: boolean,
        error: FirebaseError | null
    }>({
        data: [],
        loading: true,
        error: null
    });

    $effect(() => {

        const _user = user.current;

        if (_user.loading) {
            untrack(() => {
                posts.current = {
                    data: [],
                    loading: true,
                    error: null
                };
            });
            return;
        }

        // filtering posts depend on user
        if (!_user.data) {
            untrack(() => {
                posts.current = {
                    loading: false,
                    data: [],
                    error: null
                };
            });
            return;
        }

        return onSnapshot(
            query(
                collection(db, 'posts'),
                orderBy('createdAt')
            ), (q) => {

                if (q.empty) {
                    posts.current = {
                        loading: false,
                        data: [],
                        error: null
                    };
                }

                const data = q.docs.map(doc => {
                    const data = doc.data({
                        serverTimestamps: 'estimate'
                    });
                    data['id'] = doc.id;
                    return data;
                }
                ) as PostType[];

                if (dev) {
                    console.log(data);
                }

                posts.current = {
                    loading: false,
                    data,
                    error: null
                };

            }, (error) => {

                // Handle error
                posts.current = {
                    loading: false,
                    data: [],
                    error
                };
            });
    });
    return posts;
};