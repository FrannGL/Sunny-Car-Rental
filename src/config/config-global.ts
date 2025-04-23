import { paths } from "./paths";

export type ConfigValue = {
  site: {
    name: string;
    serverUrl: string;
  };
  auth: {
    method: "jwt" | "amplify" | "firebase" | "supabase" | "auth0";
    skip: boolean;
    redirectPath: string;
  };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  site: {
    name: "Sunny Car Rental",
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? "",
  },
  auth: {
    method: "jwt",
    skip: false,
    redirectPath: `/es/${paths.home.root}`,
  },
};
