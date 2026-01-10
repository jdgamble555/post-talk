import { dev } from '$app/environment';
import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public';
import { useSharedContext } from '$lib/shared/use-shared-context';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

const firebase_config = JSON.parse(PUBLIC_FIREBASE_CONFIG);

// client setup
export const setupFirebase = () => {
	const app = getApps().length ? getApp() : initializeApp(firebase_config);

	const auth = getAuth(app);
	const db = getFirestore(app);
	const functions = getFunctions(app);
	const storage = getStorage(app);

	if (dev) {
		connectFirestoreEmulator(db, 'localhost', 8080);
		connectFunctionsEmulator(functions, 'localhost', 5001);
		connectStorageEmulator(storage, 'localhost', 9199);
		connectAuthEmulator(auth, 'http://localhost:9099');
	}

	return {
		auth,
		db,
		app,
		functions,
		storage
	};
};

export const useFirebase = () => useSharedContext('firebase', setupFirebase);
