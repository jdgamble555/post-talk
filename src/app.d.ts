// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	type UserType = {
		displayName: string | null;
		photoURL: string | null;
		uid: string;
		email: string | null;
		username?: string;
	};

	type PostDoc = {
		createdBy: string;
		createdAt: Date;
		updatedAt?: Date;
		id: string;
		content: string;
	};

	type UserDoc = {
		createdAt: Date;
		updatedAt?: Date;
		id: string;
		username: string;
		displayName?: string | null;
		bio?: string;
	};

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
