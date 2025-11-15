"use server";

import { apiUrl } from "@/constants";
import { getLocale } from "next-intl/server";

export const getProfiles = async () => {
  const locale = await getLocale();

  const profilesResponse = await fetch(`${apiUrl}profiles?locale=${locale}`, {
    cache: "no-store",
  });

  if (!profilesResponse.ok) {
    throw new Error(`Failed to fetch profiles: ${profilesResponse.status}`);
  }
  const { docs } = await profilesResponse.json();

  return { profiles: docs };
};
