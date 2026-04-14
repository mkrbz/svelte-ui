<script lang="ts">
    import type { Snippet } from "svelte";
    import { dateOnly, formatDate } from "../../utils";
    import { DAYS, datesOfWeeks, getMonthFromWeeksDates } from "./utils";

    export type HeatmapData = { date: Date; count: number };

    export type HeatmapOptions = {
        cell?: number;
        colorScale?: (count: number, future: boolean) => string;
    };

    let {
        data = [],
        weeks = 52,
        todaysWeek = -5,
        label = "Heat map label",
        options = {},
        tooltip,
        oncellclick,
    }: {
        data?: HeatmapData[];
        weeks?: number;
        todaysWeek?: number;
        label?: string;
        options?: HeatmapOptions;
        tooltip?: Snippet<[Date]>;
        oncellclick?: (date: Date, count: number) => void;
    } = $props();

    // svelte-ignore state_referenced_locally
    const cell = options.cell ?? 20;
    const today = dateOnly(new Date());

    // svelte-ignore state_referenced_locally
    const dw = datesOfWeeks(weeks, todaysWeek);

    function defaultColorScale(count: number, future: boolean): string {
        if (future)
            return "bg-zinc-100 dark:bg-zinc-800 border border-black/10 dark:border-white/10";
        if (count === 0)
            return "bg-zinc-200 dark:bg-zinc-700 border border-black/20 dark:border-white/20";
        if (count <= 2) return "bg-primary/30";
        if (count <= 5) return "bg-primary/55";
        if (count <= 9) return "bg-primary/80";
        return "bg-primary";
    }

    function resolveColor(count: number, future: boolean): string {
        return options.colorScale
            ? options.colorScale(count, future)
            : defaultColorScale(count, future);
    }

    function getCount(day: Date): number {
        return (
            data.find((d) => dateOnly(d.date).getTime() === day.getTime())
                ?.count ?? 0
        );
    }
</script>

<div class="w-full flex justify-center">
    <div class="inline-flex flex-col gap-2 select-none">
        <p class="text-sm text-muted-foreground">
            {label}
        </p>

        <div id="weeks-grid" class="m-2 flex flex-row gap-2">
            <div id="days-col" class="flex flex-col w-6 gap-2 shrink-0">
                {#each ["", ...DAYS] as day}
                    <div
                        class="flex items-center justify-end"
                        style="height: {cell}px"
                    >
                        <span
                            class="text-sm leading-none text-muted-foreground"
                        >
                            {day}
                        </span>
                    </div>
                {/each}
            </div>
            {#each dw as datesOfWeek}
                <div
                    id="datesOfWeek-cols"
                    class="flex flex-col gap-2 justify-center items-center"
                >
                    <div class="flex" style="height: {cell}px">
                        <p
                            class="text-sm whitespace-nowrap text-muted-foreground"
                        >
                            {getMonthFromWeeksDates(datesOfWeek)}
                        </p>
                    </div>
                    {#each datesOfWeek as day}
                        {@const future = day.getTime() > today.getTime()}
                        {@const count = getCount(day)}
                        <div class="flex items-center justify-between">
                            <div
                                role="gridcell"
                                style="width: {cell}px; height: {cell}px"
                                class="relative group/cell rounded-[2px] cursor-pointer {resolveColor(
                                    count,
                                    future,
                                )} {day.getTime() === today.getTime()
                                    ? 'ring-2 ring-primary ring-offset-1'
                                    : ''}"
                                onclick={() => oncellclick?.(day, count)}
                                onkeydown={(e) =>
                                    e.key === "Enter" &&
                                    oncellclick?.(day, count)}
                                tabindex="0"
                            >
                                {#if !future}
                                    <div
                                        class="
                                        pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5
                                        -translate-x-1/2 whitespace-nowrap rounded-md border px-2 py-1
                                        text-xs shadow-md
                                        bg-popover text-popover-foreground border-border
                                        invisible group-hover/cell:visible
                                    "
                                    >
                                        {#if tooltip}
                                            {@render tooltip(day)}
                                        {:else}
                                            <span class="text-sm"
                                                >{formatDate(day)}</span
                                            >
                                        {/if}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>
