import { browser } from "$app/environment";

export function useIsMac(): { readonly current: boolean } {
	const isMac = $derived(browser ? /(macintosh|macintel|macppc|mac68k|macos)/i.test(navigator.userAgent.toLowerCase()) : false);

	return {
		get current(): boolean {
			return isMac;
		}
	};
}