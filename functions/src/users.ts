import * as functions from 'firebase-functions/v1';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getApp, getApps, initializeApp } from 'firebase-admin/app';

// Make sure admin is initialized once
const app = getApps().length ? getApp() : initializeApp();

const db = getFirestore(app);

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
	const { uid, email, displayName, photoURL } = user;

	const userRef = db.doc(`users/${uid}`);

	await userRef.set({
		email: email ?? null,
		displayName: displayName ?? null,
		photoURL: photoURL ?? null,
		createdAt: FieldValue.serverTimestamp()
	});
});
