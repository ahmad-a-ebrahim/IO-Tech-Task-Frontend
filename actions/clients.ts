"use server";

import { apiUrl } from "@/constants";
import { getLocale } from "next-intl/server";

export const getClients = async () => {
  const locale = await getLocale();

  const clientsResponse = await fetch(`${apiUrl}clients?locale=${locale}`, {
    cache: "no-store",
  });

  if (!clientsResponse.ok) {
    throw new Error(`Failed to fetch clients: ${clientsResponse.status}`);
  }
  const { docs } = await clientsResponse.json();

  return { clients: docs };
};
