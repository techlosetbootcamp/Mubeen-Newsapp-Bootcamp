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

export interface Article {
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

export interface TopStoriesState {
  articles: Article[];
  loading: boolean;
  error: boolean;
}
