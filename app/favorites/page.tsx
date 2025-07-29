import { FavoriteGroupList } from '@/components/favorites/FavoriteGroupList';

export default function FavoritesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      <FavoriteGroupList />
    </div>
  );
}
