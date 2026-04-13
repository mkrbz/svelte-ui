<script lang="ts">
    import "./layout.css";
    import { base } from "$app/paths";

    const { children } = $props();

    let dark = $state(true);

    $effect(() => {
        document.documentElement.classList.toggle("dark", dark);
    });

    function toggleTheme() {
        dark = !dark;
    }
</script>

<nav
    class="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background px-6 py-3"
>
    <a href="{base}/" class="font-semibold text-foreground hover:opacity-70">
        svelte-ui
    </a>
    <button
        onclick={toggleTheme}
        class="rounded-md border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted"
    >
        {dark ? "Light" : "Dark"}
    </button>
</nav>

{@render children()}
