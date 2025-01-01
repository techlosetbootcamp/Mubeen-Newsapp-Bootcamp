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

export interface FormattedArticle {
  uri: string;
  image: string;
  title: string;
  description: string;
  time: string;
  author: string;
}

export interface IconState {
  heart: boolean;
  share: boolean;
  save: boolean;
}

export interface NewsState {
  searchQuery: string;
  filteredArticles: FormattedArticle[];
  iconStates: IconState[];
  selectedArticle: FormattedArticle | null;
  article: Article;
  error: string | null;
  loading: boolean;
  isSearching?: boolean;
}

