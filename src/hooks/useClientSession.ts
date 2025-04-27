import { useEffect, useState } from "react";
import { getCookie } from "../util/auth/getCookie";
import { User } from "../types/user";

interface Session {
  token: string;
  user: User;
}

export const useClientSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const userSession = getCookie("user-session");

    if (userSession) {
      try {
        const parsedSession: Session = JSON.parse(userSession);
        setSession(parsedSession);
      } catch (error) {
        console.error("Error parsing user-session cookie:", error);
      }
    }
  }, []);

  return { user: session?.user, token: session?.token };
};
