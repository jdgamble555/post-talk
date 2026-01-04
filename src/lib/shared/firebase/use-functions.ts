import { FunctionsError, httpsCallable } from 'firebase/functions';
import { useFirebase } from './use-firebase';

export const useFunctions = () => {
	const { functions } = useFirebase();

	const callFunction = async <T, A>(functionName: string, data: T) => {
		const callableFunction = httpsCallable(functions, functionName);

		try {
			const result = await callableFunction(data);
            return {
                error: null,
                data: result.data as A
            }
		} catch (e) {
			if (e instanceof FunctionsError) {
				return {
					error: e,
					data: null
				};
			}
			if (e instanceof Error) {
				return {
					error: e,
					data: null
				};
			}
            throw e;
		}
	};
	return { callFunction };
};
