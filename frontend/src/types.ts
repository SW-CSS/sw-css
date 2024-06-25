export interface CategoryInfo {
  title: string;
  url: string;
  description?: string;
  sub: SubCategoryInfo[];
}

export interface SubCategoryInfo {
  title: string;
  url: string;
  key: string;
}

export interface AnnouncementInfo {
  id: number;
  url: string;
  title: string;
  date: string;
}
