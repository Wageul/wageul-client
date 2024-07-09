"use server";

import { cookies } from "next/headers";
import { CreateExperienceRequestBody, Experience, User } from "./types";
import { revalidateTag } from "next/cache";

const apiUrl = process.env.DEPLOYED_API_URL + "/api";

export async function updateProfile(values: User) {
  console.log("profile action input", values);
  console.log(JSON.stringify(values));

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

export async function uploadProfileImage(values: FormData) {
  console.log("upload profile image action input", values);
  console.log(JSON.stringify(values));

  const url = apiUrl + "/profile";
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
      // enctype: 'multipart/form-data',
    },
    body: values,
  });
  console.log("status", response.status);
  const data = await response.json();
  console.log("upload response", data);
  return data;
}

export async function createExperience(values: CreateExperienceRequestBody) {
  console.log("experience action input", values);
  console.log(JSON.stringify(values));

  const url = apiUrl + "/experience";
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  console.log("status", response.status);
  const data = await response.json();
  revalidateTag("experience-list");
  return data;
}

export async function uploadExperienceImages(values: FormData) {
  console.log("upload experience image action input", values);
  console.log(JSON.stringify(values));

  const url = apiUrl + "/upload/ex-image";
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
      // enctype: 'multipart/form-data',
    },
    body: values,
  });
  console.log("status", response.status);
  const data = await response.json();
  console.log("upload response", data);
  return data;
}

export async function deleteExperience(experienceId: string) {
  console.log("experienceId", experienceId);

  const url = apiUrl + `/experience/${experienceId}`;
  console.log(url);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
    },
  });
  console.log("delete experience status", response.status);
  revalidateTag("experience-list");
  return;
}

export async function addBookmark(experienceId: string) {
  console.log("experienceId", experienceId);
  const url = apiUrl + "/bookmark";
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ experienceId: Number(experienceId) }),
  });
  console.log("add bookmark status", response.status);
  revalidateTag("bookmarks");
  return;
}

export async function deleteBookmark(experienceId: string) {
  console.log("experienceId", experienceId);
  const url = apiUrl + `/bookmark/${experienceId}`;
  console.log(url);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
    },
  });
  console.log("delete bookmark status", response.status);
  revalidateTag("bookmarks");
  return;
}

export async function addParticipant(experienceId: string) {
  console.log("experienceId", experienceId);
  const url = apiUrl + "/participation";
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ experienceId: Number(experienceId) }),
  });
  console.log("add participant status", response.status);
  const data = await response.json();
  revalidateTag("participants");
  return data;
}

export async function deleteParticipant(participationId: number) {
  console.log("participationId", participationId);
  const url = apiUrl + `/participation/${participationId}`;
  console.log(url);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
  });
  console.log("delete participant status", response.status);
  revalidateTag("participants");
  return;
}

export async function deleteParticipantByHost(
  participationId: number,
  userId: number
) {
  console.log("participationId", participationId);
  const url = apiUrl + `/participation/decline/${participationId}/${userId}`;
  console.log(url);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
  });
  console.log("decline participant status", response.status);
  revalidateTag("participants");
  return;
}
