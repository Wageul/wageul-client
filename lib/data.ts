import { cookies } from "next/headers";
import { Experience, User } from "./types";

const apiUrl = process.env.DEPLOYED_API_URL;
const TOKEN_INVALID_CODE = 401;

export async function fetchExperienceById(id: string) {
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }
  try {
    const url = apiUrl + `/experience/${id}`;
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    return data as Experience;
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the experience.");
  }
}

export async function fetchAllExperience() {
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }
  try {
    const response = await fetch(apiUrl + "/experience");
    const data = await response.json();
    console.log(data);
    return data as Experience[];
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the experience.");
  }
}

export async function authenticateUserAndGetData() {
  if (!cookies().has("token")) {
    return { loggedIn: false, data: null };
  }

  try {
    // console.log("token:", token);
    const url = apiUrl + "/user";
    console.log("url:", url);
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `token=${cookies().get("token")!.value}`,
      },
    });

    console.log("status code:", response.status);
    if (response.status === TOKEN_INVALID_CODE) {
      return { loggedIn: false, data: null };
    }

    const data = await response.json();
    console.log("data from authenticateUserAndGetData", data);
    return { loggedIn: true, data: data as User };
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the user.");
  }
}

export async function fetchUserDataByToken(token: string) {
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }
  try {
    // console.log("token:", token);
    const url = apiUrl + "/user";
    console.log("url:", url);
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
        // Authorization: `Bearer ${token}`,
        // Authorization: token,
      },
    });
    console.log("status code:", response.status);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the user.");
  }
}

export async function fetchUserFromRouteHandler() {
  const response = await fetch("http://localhost:3000/api/user");
  const data = await response.json();

  return data;
}
