// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	type PostType = {
		createdBy: string;
		createdAt: Date;
		id: string;
		content: string;
	};

	type UserType = {
		displayName: string | null;
		photoURL: string | null;
		uid: string;
		email: string | null;
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
