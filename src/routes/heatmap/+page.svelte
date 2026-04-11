<script lang="ts">
    import { Heatmap } from "@lib";
    import type { HeatmapData } from "@lib";
    import { formatDate } from "@lib/utils";

    function randomData(): HeatmapData[] {
        const entries: HeatmapData[] = [];
        const today = new Date();
        for (let i = 0; i < 200; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() - Math.floor(Math.random() * 365));
            entries.push({
                date: d,
                count: Math.floor(Math.random() * 12) + 1,
            });
        }
        return entries;
    }

    const data = randomData();

    let lastClicked = $state<{ date: Date; count: number } | null>(null);
</script>

<div class="p-8 flex flex-col gap-8">
    <section class="flex flex-col gap-2">
        <h2 class="text-lg font-semibold">Default</h2>
        <Heatmap {data} label="Activity over the last year" />
    </section>

    <section class="flex flex-col gap-2">
        <h2 class="text-lg font-semibold">Custom color scale</h2>
        <Heatmap
            {data}
            label="Custom colors"
            options={{
                colorScale: (count, future) => {
                    if (future)
                        return "bg-zinc-100 dark:bg-zinc-800 border border-black/10 dark:border-white/10";
                    if (count === 0)
                        return "bg-zinc-200 dark:bg-zinc-700 border border-black/20 dark:border-white/20";
                    if (count <= 3) return "bg-blue-200 dark:bg-blue-900";
                    if (count <= 7) return "bg-blue-400 dark:bg-blue-600";
                    return "bg-blue-600 dark:bg-blue-400";
                },
            }}
        />
    </section>

    <section class="flex flex-col gap-2">
        <h2 class="text-lg font-semibold">Custom tooltip + click handler</h2>
        <Heatmap
            {data}
            label="Click a cell"
            oncellclick={(date, count) => (lastClicked = { date, count })}
        >
            {#snippet tooltip(date)}
                {@const count =
                    data.find(
                        (d) =>
                            new Date(d.date).toDateString() ===
                            date.toDateString(),
                    )?.count ?? 0}
                <div class="flex flex-col gap-0.5">
                    <span class="font-medium">{formatDate(date)}</span>
                    <span class="text-muted-foreground"
                        >{count} contribution{count !== 1 ? "s" : ""}</span
                    >
                </div>
            {/snippet}
        </Heatmap>
        {#if lastClicked}
            <p class="text-sm text-muted-foreground">
                Clicked: <span class="text-foreground font-medium"
                    >{formatDate(lastClicked.date)}</span
                >
                — {lastClicked.count} contribution{lastClicked.count !== 1
                    ? "s"
                    : ""}
            </p>
        {/if}
    </section>
</div>
