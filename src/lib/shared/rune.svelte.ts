export const rune = <T>(initialValue: T) => {
    const _rune = $state({ current: initialValue });
    return _rune;
};