import { cookies } from "next/headers";
import { Bookmark, Experience, Participant, User } from "./types";

// const apiUrl = process.env.DEPLOYED_API_URL + "/api";
const apiUrl = process.env.LOCAL_API_URL + "/api";
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
    console.log("data from fetchExperienceById", data);
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
    const response = await fetch(apiUrl + "/experience", {
      next: { tags: ["experience-list"] },
    });
    const data = await response.json();
    console.log("data from fetchAllExperience", data);
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

export async function fetchOtherUserData(userId: string) {
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }
  try {
    // console.log("token:", token);
    const url = apiUrl + `/user/${userId}`;
    console.log("url:", url);
    const response = await fetch(url, {
      method: "GET",
    });
    console.log("status code:", response.status);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the other user.");
  }
}

export async function fetchBookmarks() {
  if (!cookies().has("token")) {
    console.log("no token");
    return;
  }

  try {
    // console.log("token:", token);
    const url = apiUrl + "/bookmark";
    console.log("url:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `token=${cookies().get("token")!.value}`,
      },
      next: { tags: ["bookmarks"] },
    });

    console.log("bookmark status code:", response.status);
    if(response.status === TOKEN_INVALID_CODE){
      return [] as Bookmark[];
    }

    const data = await response.json();
    console.log("data from fetchBookmarks", data);
    return data as Bookmark[];
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the bookmarks.");
  }
}

export async function fetchAllParticipants() {
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }
  try {
    const url = apiUrl + "/participation/experience";
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    // console.log("data from fetchAllParticipants", data);
    return data as {
      experienceId: number;
      userSimpleProfileList: Participant[];
    }[];
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the participants.");
  }
}

export async function fetchParticipations() {
  if (!cookies().has("token")) {
    console.log("no token");
    return;
  }

  try {
    // console.log("token:", token);
    const url = apiUrl + "/participation";
    console.log("url:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `token=${cookies().get("token")!.value}`,
      },
      next: { tags: ["participants"] },
    });

    console.log("bookmark status code:", response.status);
    const data = await response.json();
    console.log("data from fetchparticipations(schedules)", data);
    return data as Bookmark[];
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the participations(schedules).");
  }
}

export async function fetchHosted() {
  if (!cookies().has("token")) {
    console.log("no token");
    return;
  }

  try {
    // console.log("token:", token);
    const url = apiUrl + "/experience/my";
    console.log("url:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `token=${cookies().get("token")!.value}`,
      },
      next: { tags: ["participants"] },
    });

    console.log("hosted experience status code:", response.status);
    const data = await response.json();
    console.log("data from hosted experience(schedules)", data);
    return data as Experience[];
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the hosted experience(schedules).");
  }
}