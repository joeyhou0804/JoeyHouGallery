export type Link = { label: string; href: string };

export type SectionIntro = {
  type: 'intro';
  title: string;
  body?: string[];
  links?: Link[];
};

export type SectionGallery = {
  type: 'gallery';
  title: string;
  body?: string;
  images: string[];
};

export type Section = SectionIntro | SectionGallery;

export type PageContent = {
  title: string;
  sections: Section[];
};

// Videos
export type VideoItem = { title: string; youtubeId: string; description?: string };
export type SectionVideos = { type: 'videos'; title: string; items: VideoItem[] };
export type VideosPageContent = {
  title: string;
  sections: (SectionIntro | SectionVideos)[];
};
