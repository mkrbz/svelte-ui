<script lang="ts">
    const components = [{ name: "Heatmap", href: "/heatmap" }];
</script>

<div class="p-8 flex flex-col gap-4">
    <h1 class="text-2xl font-bold">Components</h1>
    <ul class="flex flex-col gap-2">
        {#each components as { name, href }}
            <li>
                <a
                    {href}
                    class="text-primary underline underline-offset-4 hover:opacity-70"
                >
                    {name}
                </a>
            </li>
        {/each}
    </ul>
</div>
