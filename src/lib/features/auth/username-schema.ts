import * as v from 'valibot';

export const UsernameSchema = v.object({
	username: v.pipe(
		v.string(),
		v.trim(),
		v.toLowerCase(),
		v.minLength(3, 'Username must be at least 3 characters'),
		v.maxLength(20, 'Username must be at most 20 characters'),
		v.regex(
			/^[a-zA-Z0-9]+(?:[._][a-zA-Z0-9]+)*$/,
			'Username can only contain letters, numbers, dots, and underscores'
		)
	)
});
