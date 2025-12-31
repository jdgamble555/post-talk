import {
    onIdTokenChanged,
    type User
} from "firebase/auth";
import { onDestroy } from "svelte";
import { rune } from "./rune.svelte";
import { useSharedContext } from "./use-shared-context";
import { useFirebase } from "./use-firebase";


const _useUser = () => {

    const { auth } = useFirebase();

    const user = rune<{
        loading: boolean,
        data: UserType | null,
        error: Error | null
    }>({
        loading: true,
        data: null,
        error: null
    });

    const unsubscribe = onIdTokenChanged(
        auth,
        (_user: User | null) => {

            // not logged in
            if (!_user) {
                user.current = {
                    loading: false,
                    data: null,
                    error: null
                };
                return;
            }

            // logged in
            const { displayName, photoURL, uid, email } = _user;
            user.current = {
                loading: false,
                data: { displayName, photoURL, uid, email },
                error: null
            };
        }, (error) => {

            // error
            user.current = {
                loading: false,
                data: null,
                error
            };
        });

    onDestroy(unsubscribe);

    return user;
};

export const useUser = () => useSharedContext('user', _useUser);
