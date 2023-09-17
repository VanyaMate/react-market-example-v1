export const cn = function (...classNames: (string | undefined | null)[]): string {
    return classNames.filter((className) => className).join(' ');
}