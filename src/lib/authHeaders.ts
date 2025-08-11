import { useAuth } from "@clerk/nextjs";

export function useAuthHeaders() {
  const { getToken } = useAuth();

  return async () => {
    const token = await getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
}

import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function getAuthHeadersServer(req: NextRequest) {
  const { getToken } = getAuth(req);
  const token = await getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
