<script lang="ts">
  import { type VideoSource } from "../types";
  import { createEventDispatcher } from "svelte";

  export let sources: VideoSource[] = [];
  export let styleClass: string = "";

  let paused: boolean;

  const onClick = () => {
    paused = !paused;
  };

  const defaultSourceProps: Partial<VideoSource> = {
    type: "video/mp4",
  };

  const dispatch = createEventDispatcher();
</script>

<video
  class={styleClass}
  autoplay
  loop
  muted
  width="100%"
  playsinline
  bind:paused
  on:click={onClick}
  on:canplaythrough={() => {
    dispatch("loaded");
  }}
>
  {#each sources as source (source.src)}
    <source {...defaultSourceProps} {...source} />
  {/each}
</video>
