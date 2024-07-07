"use server";

import { cookies } from "next/headers";
import { CreateExperienceRequestBody, Experience, User } from "./types";

const apiUrl = process.env.DEPLOYED_API_URL+'/api';

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
  console.log('upload response', data);
  return data;
}