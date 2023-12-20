export interface ApiResponse<T> {
  res?: FilmItem;
  success?: boolean;
  data: T;
  code?: number;
}

export interface FilmItem {
  _id: string;
  name: string;
  content: string;
  image: string;
  link_movies: string;
  time: string;
  slug: string;
  createdAt: Date;
  category_movies: string;
  count_see: number;
  director: string;
  editor: string;
}

export type HeaderType = {
  Accept: string;
  DeviceId: string;
  DeviceName: string;
  Authorization?: string | undefined;
};
