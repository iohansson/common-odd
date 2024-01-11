import { z, defineCollection } from "astro:content";
import { SKILLS } from "../types";

const media = z.object({
  type: z.enum(["VIDEO", "IMAGE"]),
  sources: z.object({ src: z.string(), type: z.string().optional() }).array(),
});

const workCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date().optional(),
    cover: media,
    media: media.array(),
    tags: z.nativeEnum(SKILLS).array().optional(),
  }),
});

export const collections = {
  work: workCollection,
};
