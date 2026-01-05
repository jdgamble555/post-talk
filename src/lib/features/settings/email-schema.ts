import * as v from 'valibot';

export const emailSchema = v.object({
	email: v.pipe(
		v.string(),
		v.nonEmpty('Please enter your email.'),
		v.email('Please enter a valid email address.')
	)
});
