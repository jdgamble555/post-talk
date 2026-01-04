import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import * as v from 'valibot';
import type { InferOutput } from 'valibot';
import { converter } from './converter';
import { getAuth } from 'firebase-admin/auth';
import { getApp, getApps, initializeApp } from 'firebase-admin/app';
import { UsernameSchema } from './username-schema';

const app = getApps().length ? getApp() : initializeApp();

const dbAdmin = getFirestore(app);
const authAdmin = getAuth(app);

type UserDocType = InferOutput<typeof UsernameSchema> & {
	createdAt: Timestamp;
	updatedAt?: Timestamp;
};
type UsernameDocType = {
	uid: string;
	createdAt: Timestamp;
};

export const setUsername = onCall(async ({ auth, data }) => {
	if (!auth) {
		throw new HttpsError('unauthenticated', 'Authentication required');
	}

	const result = v.safeParse(UsernameSchema, data);

	if (!result.success) {
		throw new HttpsError('invalid-argument', 'Invalid username');
	}

	const { username } = result.output;

	// References
	const userDocRef = dbAdmin
		.collection('users')
		.doc(auth.uid)
		.withConverter(converter<UserDocType>());

	const newUsernameDocRef = dbAdmin
		.collection('usernames')
		.doc(username)
		.withConverter(converter<UsernameDocType>());

	const transction = await dbAdmin.runTransaction(async (tx) => {
		// Check for old username
		const userDocSnap = await tx.get(userDocRef);
		const currentUserDoc = userDocSnap.data();

		// Do nothing if username is unchanged
		if (currentUserDoc?.username === username) {
			return { ok: true, username, changed: false };
		}

		const newUsernameDocSnap = await tx.get(newUsernameDocRef);

		// Error if username is taken
		if (newUsernameDocSnap.exists) {
			const usernameUser = newUsernameDocSnap.data()?.uid;
			if (usernameUser && usernameUser !== auth.uid) {
				throw new HttpsError('already-exists', 'Username is already taken');
			}
		}

		// Delete old username doc
		if (currentUserDoc?.username) {
			const currentUsernameRef = dbAdmin
				.collection('usernames')
				.doc(currentUserDoc.username)
				.withConverter(converter<UsernameDocType>());
			tx.delete(currentUsernameRef);
		}

		// Set new username doc
		tx.set(newUsernameDocRef, {
			uid: auth.uid,
			createdAt: FieldValue.serverTimestamp()
		});

		// Update user doc
		tx.set(
			userDocRef,
			{
				username,
				updatedAt: FieldValue.serverTimestamp()
			},
			{ merge: true }
		);

		return { ok: true, username, changed: true };
	});

	if (!transction.changed) {
		return transction;
	}

	// Update custom claims with new username
	const userRecord = await authAdmin.getUser(auth.uid);
	const existingClaims = userRecord.customClaims;

	await authAdmin.setCustomUserClaims(auth.uid, {
		...existingClaims,
		username: transction.username
	});

	return transction;
});
