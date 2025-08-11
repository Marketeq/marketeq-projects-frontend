import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4003";

export const favoritesClient = {
  getFavorites: async (token: string) => {
    const res = await axios.get(`${API_BASE_URL}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  addFavorite: async (itemId: string, token: string) => {
    const res = await axios.post(
      `${API_BASE_URL}/favorites/${itemId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },

  removeFavorite: async (itemId: string, token: string) => {
    const res = await axios.delete(`${API_BASE_URL}/favorites/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};
