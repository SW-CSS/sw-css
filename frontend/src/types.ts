export interface CategoryInfo {
  title: string;
  url: string;
  sub: {
    title: string;
    url: string;
    key: string;
  }[];
}
