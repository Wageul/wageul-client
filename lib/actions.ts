"use server";

import { cookies } from "next/headers";
import { User } from "./types";

const apiUrl = process.env.API_URL3;

export async function updateProfile(values: User) {
  const url = apiUrl + `/user/${2}`;
  console.log(url);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...values,
      profileImage: "https://test1.jpg",
    }),
  });
  console.log("status", response.status);
}
