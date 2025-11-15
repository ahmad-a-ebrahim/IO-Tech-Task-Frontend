"use server";

import { apiUrl } from "@/constants";
import { getLocale } from "next-intl/server";

export const getTeam = async () => {
  const locale = await getLocale();

  const teamResponse = await fetch(`${apiUrl}teams?locale=${locale}`, {
    cache: "no-store",
  });

  if (!teamResponse.ok) {
    throw new Error(`Failed to fetch team: ${teamResponse.status}`);
  }
  const { docs } = await teamResponse.json();

  return { team: docs };
};
