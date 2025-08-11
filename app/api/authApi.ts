

import { apiClient } from '@/lib/apiClient';

export const getCurrentUser = () => apiClient.get('/me');