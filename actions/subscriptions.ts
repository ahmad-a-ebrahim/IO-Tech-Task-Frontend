"use server";

import { apiUrl } from "@/constants/index";

export async function addSubscription(email: string) {
  try {
    const response = await fetch(`${apiUrl}subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = "Failed to subscribe due to a server error.";

      if (response.status === 400 && data.errors && data.errors.length) {
        if (data.errors[0].message.includes("unique")) {
          errorMessage = "This email is already subscribed.";
        } else {
          errorMessage = data.errors[0].message;
        }
      } else if (data.message) {
        errorMessage = data.message;
      }

      return { data: null, error: errorMessage };
    }

    return { data: data.doc || data, error: null };
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown network error occurred.";
    return { data: null, error: errorMessage };
  }
}
