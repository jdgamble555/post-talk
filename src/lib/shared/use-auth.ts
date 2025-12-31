import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useFirebase } from "./use-firebase";

export const useAuth = () => {

    const { auth } = useFirebase();

    const loginWithGoogle = async () => {
        return await signInWithPopup(
            auth,
            new GoogleAuthProvider()
        );
    };

    const logout = async () => {
        return await signOut(auth);
    };

    return {
        loginWithGoogle,
        logout
    };
};