import { CONFIG } from "@/src/config/config-global";
import { User } from "@/src/types/user";
import { cookies } from "next/headers";

interface ServerSession {
  user: User | null;
  token: string | null;
}

export const getServerSession = (): ServerSession => {
  const cookieStore = cookies();
  const session = cookieStore.get("user-session")?.value || null;

  if (!session) {
    return { user: null, token: null };
  }

  try {
    const parsedSession = JSON.parse(session);
    return {
      user: parsedSession.user || null,
      token: parsedSession.token || null,
    };
  } catch (error) {
    console.error("Error parsing user data from cookies:", error);
    return { user: null, token: null };
  }
};
