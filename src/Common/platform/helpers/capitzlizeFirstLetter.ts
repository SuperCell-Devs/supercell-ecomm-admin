    /**
     * Capitalize the first letter in a string.
     * @param word 
     * @returns 
     */
export const capitalizeFirstLetter = (word: string) => {
        const firstletter = word[0];
        const rest = word.slice(1);
        return `${firstletter.toUpperCase()}${rest}`;
}
    