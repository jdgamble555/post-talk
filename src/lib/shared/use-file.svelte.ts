export const useFile = () => {
	const fileInput = $state<{
		current: HTMLInputElement | null;
	}>({
		current: null
	});
	const files = $state<{
		current: FileList | null;
	}>({
		current: null
	});

	const resetFiles = () => {
		files.current = new DataTransfer().files;
	};

	const file = {
		get current() {
			return files.current?.item(0) ?? null;
		}
	};

	return {
		fileInput,
		file,
		files,
		resetFiles
	};
};
