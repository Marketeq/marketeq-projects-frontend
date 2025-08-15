// utils/auth.ts
import { Conversation } from "@/types/conversation";
import {jwtDecode} from "jwt-decode";

export interface CurrentUser {
  id: string;
  username: string;
  avatarUrl?: string;
}

export const getCurrentUser = (): CurrentUser  | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<CurrentUser>(token);
    return decoded;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};



function getOtherParticipantId(conv: Conversation, me: string): string | undefined {
  return conv.participants.find(p => p.userId !== me)?.userId;
}
