"use server";

import { apiUrl } from "@/constants";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const getServiceById = async ({ serviceId }: { serviceId: string }) => {
  const locale = await getLocale();

  const serviceResponse = await fetch(
    `${apiUrl}services/${serviceId}?locale=${locale}`,
    {
      cache: "no-store",
    }
  );

  if (serviceResponse.status === 404) notFound();

  if (!serviceResponse.ok) {
    throw new Error(`Failed to fetch service: ${serviceResponse.status}`);
  }

  const serviceData = await serviceResponse.json();

  return serviceData;
};

export const getServices = async ({
  q,
  limit,
  page,
}: {
  q: string;
  limit: number;
  page: number;
}) => {
  const locale = await getLocale();

  const servicesResponse = await fetch(
    `${apiUrl}services?page=${page}&limit=${limit}&where[title.${locale}][contains]=${q}&locale=${locale}`,
    {
      cache: "no-store",
    }
  );

  if (!servicesResponse.ok) {
    throw new Error(`Failed to fetch service: ${servicesResponse.status}`);
  }
  const { docs, hasNextPage, hasPrevPage, totalPages } =
    await servicesResponse.json();

  return { services: docs, hasNextPage, hasPrevPage, totalPages };
};
