import * as functions from 'firebase-functions/v1';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getApp, getApps, initializeApp } from 'firebase-admin/app';

// Make sure admin is initialized once
const app = getApps().length ? getApp() : initializeApp();

const db = getFirestore(app);

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
	const { uid, displayName, photoURL } = user;

	const userRef = db.doc(`users/${uid}`);

	// Don't save email for privacy reasons
	await userRef.set({
		displayName: displayName ?? null,
		photoURL: photoURL ?? null,
		createdAt: FieldValue.serverTimestamp()
	});
});
