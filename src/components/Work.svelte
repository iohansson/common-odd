<script lang="ts">
  import Video from "./Video.svelte";
  import Picture from "./Picture.svelte";
  import { type Work, MEDIA_TYPE } from "../types";
  import clsx from "clsx";
  import { onMount } from "svelte";

  export let work: Work;
  export let styleClass: string[] = [];
  export let alignment: "left" | "right" = "left";

  let loaded: boolean = false;
  let visible: boolean = false;

  onMount(() => {
    visible = true;
  });
</script>

<section
  class={clsx(
    "relative overflow-hidden transition-all ease-in-out duration-500 transform",
    styleClass
  )}
>
  <div
    class={clsx("transition-all ease-in-out duration-500 transform", {
      "opacity-0 translate-y-full": !visible,
      "opacity-100 translate-y-0": visible,
    })}
  >
    <div class="relative overflow-hidden w-full">
      {#if work.cover.type === MEDIA_TYPE.VIDEO}
        <Video
          sources={work.cover.sources}
          on:loaded={() => (loaded = true)}
          styleClass={clsx(
            "w-full object-cover aspect-video opacity-0 transition-opacity",
            {
              "opacity-100": loaded,
            }
          )}
        />
      {:else}
        <Picture
          sources={work.cover.sources}
          alt={work.title}
          on:loaded={() => (loaded = true)}
          styleClass={clsx(
            "w-full object-contain aspect-video opacity-0 transition-opacity",
            {
              "opacity-100": loaded,
            }
          )}
        />
      {/if}
      <div
        class={clsx(
          "absolute inset-0 bg-violet flex flex-col justify-center items-center",
          "transform transition-transform ease-in-out duration-500 animate-pulse",
          {
            "translate-x-0": !loaded,
            "-translate-x-full": loaded && alignment === "left",
            "translate-x-full": loaded && alignment === "right",
          }
        )}
      />
    </div>
    <div class="p-4">
      <h2 class="text-violet text-4xl font-bold">{work.title}</h2>
      <p class="pt-1">{work.description}</p>
      {#if work.tags?.length}
        <div class="flex flex-wrap pt-2 gap-2">
          {#each work.tags as tag}
            <span
              class="text-violet text-sm opacity-60 border border-violet rounded px-1 py-0.5"
            >
              {tag}
            </span>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
