<script lang="ts">
    import "./layout.css";

    const { children } = $props();

    let dark = $state(false);

    function toggleTheme() {
        dark = !dark;
        document.documentElement.classList.toggle("dark", dark);
    }
</script>

<button
    onclick={toggleTheme}
    class="fixed top-4 right-4 z-50 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground shadow-sm hover:bg-muted"
>
    {dark ? "Light" : "Dark"}
</button>

{@render children()}
