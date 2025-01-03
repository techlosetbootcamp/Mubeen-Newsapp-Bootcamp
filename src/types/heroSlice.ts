export interface Multimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

export interface HeroArticle {
  uri: string;
  title: string;
  description: string;
  abstract: string;
  published_date: string;
  byline?: { original: string };
  multimedia: Multimedia[] | null;
  image: string;
  author: string;
  time: string;
  headline: { main: string };
  pub_date: string;
  isSearching: boolean;
}

export interface HeroState {
  heroArticle: HeroArticle | null;
  isHearted: boolean;
  isShared: boolean;
  isBookmarked: boolean;
  loading: boolean;
}

export interface IconStatePayload {
  icon: "heart" | "share" | "bookmark";
  value: boolean;
}
