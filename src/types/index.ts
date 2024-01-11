export type VideoSource = {
  src: string;
  type?: string;
};

export type ImageSource = {
  src: string;
  type?: string;
  // todo: extend with conditions to show a source
};

type Source = VideoSource | ImageSource;

export enum MEDIA_TYPE {
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
}

export type Media = {
  type: MEDIA_TYPE;
  sources: Source[];
};

export type Work = {
  title: string;
  description: string;
  date?: Date;
  cover: Media;
  media: Media[];
  tags?: string[];
};

export enum SKILLS {
  INDESIGN = "Adobe InDesign",
  PHOTOSHOP = "Adobe Photoshop",
  ILLUSTRATOR = "Adobe Illustrator",
  LIGHTROOM = "Adobe Lightroom",
  PREMIERE_PRO = "Adobe Premiere Pro",
  AFTER_EFFECTS = "Adobe After Effects",
  FIGMA = "Figma",
  PROCREATE = "Procreate",
  VIDEO_PRODUCTION = "Video Production",
  PHOTOGRAPHY = "Photography",
  FOOD_PHOTOGRAPHY = "Food Photography",
  CREATIVE_DIRECTION = "Creative Direction",
  MOTION_GRAPHICS = "Motion Graphics",
  SET_DESIGN = "Set Design",
  PREPRESS = "Prepress",
  CAPTURE_ONE = "Capture One",
  SPLINE = "Spline",
  SHAPR3D = "Shapr3D",
  NOMAD_SCULPT = "Nomad Sculpt",
  PRINT_LAYOUT_DESIGN = "Print Layout Design",
}
