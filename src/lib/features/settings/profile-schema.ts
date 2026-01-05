import * as v from 'valibot';

export const profileShema = v.object({
	bio: v.nullable(
		v.pipe(
			v.string(),
			v.maxLength(160, 'Bio must be at most 160 characters long.')
		)
	),
	displayName: v.pipe(
		v.string(),
		v.minLength(2, 'Display name must be at least 2 characters long.'),
		v.maxLength(50, 'Display name must be at most 50 characters long.')
	)
});
