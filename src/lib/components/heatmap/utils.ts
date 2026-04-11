import { dateByOffset, dateOnly, firstDateOfTheWeek } from "@lib/utils";
import type { DatesOfWeek } from "./types";

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

/**
 * Generates the array of weeks dates
 *
 * @param weeks - The number of weeks
 * @param todaysWeekNr - The index of the week today's date belongs to. Can be negative (e.g. `-1` places today in the last week).
 * @returns The array of dates array belonging to a week `[[date1, date2,...]]`
 *
 * @example
 * ```ts
 * datesOfWeeks(2, -1) = [
 *  ["2026-04-11", "2026-04-12" "2026-04-13", "2026-04-14", "2026-04-15", "2026-04-16", "2026-04-17"],
 *  ["2026-04-18", "2026-04-19" "2026-04-20", "2026-04-21", "2026-04-22", "2026-04-23", "2026-04-24"]
 *  //                                         ^
 *  //                                         today
 * ]
 * ```
 */
export function datesOfWeeks(weeks: number, todaysWeekNr: number): DatesOfWeek[] {
    todaysWeekNr = ((todaysWeekNr % weeks) + weeks) % weeks;
    const today = new Date();
    const firstDayOfTodaysWeek = firstDateOfTheWeek(today);

    const dow: DatesOfWeek[] = [];
    for (let i = 0; i < weeks; i++) {
        const weeksDates = [0, 1, 2, 3, 4, 5, 6].map(day => {
            const daysOffset = 7 * (i - todaysWeekNr) + day;
            return dateByOffset(firstDayOfTodaysWeek, daysOffset);
        });
        dow.push(weeksDates);
    }
    return dow;
}

export function getMonthFromWeeksDates(datesOfWeek: DatesOfWeek): string {
    const date = datesOfWeek.find((d) => d.getDate() === 1);
    if (!date) return "";
    return MONTHS[date.getMonth()];
}
