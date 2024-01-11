<script lang="ts">
  import { type ImageSource } from "../types";
  import { createEventDispatcher, onMount } from "svelte";
  export let sources: ImageSource[] = [];
  export let alt: string;
  export let styleClass: string = "";

  const dispatch = createEventDispatcher();

  let img: HTMLImageElement;

  onMount(() => {
    if (img?.complete) {
      dispatch("loaded");
    }
  });
</script>

<picture>
  {#each sources.slice(0, -1) as source}
    <source srcset={source.src} type={source.type} />
  {/each}
  <img
    class={styleClass}
    src={sources.at(-1)?.src}
    {alt}
    loading="lazy"
    on:load={() => {
      dispatch("loaded");
    }}
    bind:this={img}
  />
</picture>
