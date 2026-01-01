import {
    collection,
    doc,
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