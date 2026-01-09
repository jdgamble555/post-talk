import * as v from 'valibot';

export const useValibotSchema = <T extends v.GenericSchema>(schema: T) => {

	type IssuesState = {
		current: v.FlatErrors<T>['nested'] | null;
	};

	const issues = $state<IssuesState>({ current: null });

	const validate = (data: v.InferInput<T>) => {
		const result = v.safeParse(schema, data);

		if (!result.success) {
			issues.current = v.flatten<typeof schema>(result.issues).nested;
			return;
		}

		issues.current = null;
	};

	return {
		issues,
		validate
	};
};
