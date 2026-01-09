import * as v from 'valibot';

export const emailSchema = v.object({
	email: v.pipe(
		v.string(),
		v.minLength(1, 'Email is required'),
		v.email('Invalid email address')
	)
});
