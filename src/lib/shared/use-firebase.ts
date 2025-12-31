import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public';
import { useSharedContext } from '$lib/shared/use-shared-context';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebase_config = JSON.parse(PUBLIC_FIREBASE_CONFIG);

// client setup
export const setupFirebase = () => {
	const app = getApps().length ? getApp() : initializeApp(firebase_config);

	const auth = getAuth(app);
	const db = getFirestore(app);

	return {
		auth,
		db,
		app
	};
};

export const useFirebase = () => useSharedContext('firebase', setupFirebase);
