# @mkrbz/svelte-ui

A Svelte 5 component library with a built-in storybook-style preview app.

**[Live preview](https://mkrbz.github.io/svelte-ui)**

## Components

- Heatmap

## Usage

```sh
bun add @mkrbz/svelte-ui
```

```svelte
<script>
    import { Heatmap } from '@mkrbz/svelte-ui';
</script>

<Heatmap data={[]} label="My activity" />
```

## Development

```sh
bun install
bun run dev
```

## Building the library

```sh
bun run build
```
