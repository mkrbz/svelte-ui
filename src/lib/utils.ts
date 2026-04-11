/**
 * Formats a Date object as an ISO-style date string.
 * @param date - The date to format.
 * @returns A string in `YYYY-MM-DD` format.
 */
export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

/**
 * Strips the time component from a Date, returning a new Date at midnight (00:00:00).
 * @param date - The date to truncate.
 * @returns A new Date with the same year, month, and day but with time set to midnight.
 */
export function dateOnly(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Returns a new Date representing the day after the given date.
 * @param date - The reference date.
 * @returns A date-only Date for the following day.
 */
export function nextDay(date: Date): Date {
    const d = dateOnly(date);
    d.setDate(d.getDate() + 1);
    return d;
}

/**
 * Returns a new Date representing the day before the given date.
 * @param date - The reference date.
 * @returns A date-only Date for the preceding day.
 */
export function previousDay(date: Date): Date {
    const d = dateOnly(date);
    d.setDate(d.getDate() - 1);
    return d;
}

/**
 * Returns the date of Monday of the week containing the given date.
 * @param date - The reference date.
 * @returns A date-only Date for the Monday of the same week.
 */
export function firstDateOfTheWeek(date: Date): Date {
    const d = dateOnly(date);
    const dayOfWeek = d.getDay();
    // getDay has 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // The `offset` is neccessary to make Monday the first day of the week
    const offset = (dayOfWeek + 6) % 7;
    d.setDate(d.getDate() - offset);
    return d;
}

/**
 * Returns a new Date offset by the given number of days from the reference date.
 * Use a negative value for `offset` to go backwards in time.
 * @param date - The reference date.
 * @param offset - Number of days to add (negative to subtract).
 * @returns A date-only Date shifted by `offset` days from `date`.
 */
export function dateByOffset(date: Date, offset: number): Date {
    const d = dateOnly(date);
    d.setDate(d.getDate() + offset);
    return d;
}
