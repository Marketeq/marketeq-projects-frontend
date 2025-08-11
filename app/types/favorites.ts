export type Favorite = {
  id: string;
  metadata: {
    title: string;
    [key: string]: any;
  };
};

export type FavoriteGroup = {
  name: string;
  favorites: Favorite[];
};