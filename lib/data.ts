import { cookies } from "next/headers";
import {
  Bookmark,
  Experience,
  Participant,
  ReviewResponse,
  User,
} from "./types";

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
    console.log(
      `data.ts fetchExperienceById ${url} status code:`,
      response.status
    );
    const data = await response.json();
    // console.log("data from fetchExperienceById", data);
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
    console.log(
      `data.ts fetchAllExperience ${apiUrl + "/experience"} status code:`,
      response.status
    );
    const data = await response.json();
    // console.log("data from fetchAllExperience", data);
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
    // console.log(
    //   'data.ts authenticateUserAndGetData cookies().get("token").value',
    //   cookies().get("token")?.value
    // );
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

    console.log(
      `data.ts authenticateUserAndGetData ${url} status code:`,
      response.status
    );
    if (response.status === TOKEN_INVALID_CODE) {
      return { loggedIn: false, data: null };
    }

    const data = await response.json() as {
      user: User;
      createdExCnt: number;
      joinedPtCnt: number;
    };
    // console.log("data from authenticateUserAndGetData", data);
    return { loggedIn: true, data };
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
    console.log(
      `data.ts fetchUserDataByToken ${url} status code:`,
      response.status
    );
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
    console.log(
      `data.ts fetchOtherUserData ${url} status code:`,
      response.status
    );

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
    return [] as Bookmark[];
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

    console.log(`data.ts fetchBookmarks ${url} status code:`, response.status);

    if (response.status === TOKEN_INVALID_CODE) {
      return [] as Bookmark[];
    }

    const data = await response.json();
    // console.log("data from fetchBookmarks", data);
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
    console.log(
      `data.ts fetchAllParticipants ${url} status code:`,
      response.status
    );

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
    return [] as Bookmark[];
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

    console.log(
      `data.ts fetchParticipations ${url} status code:`,
      response.status
    );

    const data = await response.json();
    // console.log("data from fetchparticipations(schedules)", data);
    return data as Bookmark[];
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the participations(schedules).");
  }
}

export async function fetchHosted() {
  if (!cookies().has("token")) {
    console.log("no token");
    return [] as Experience[];
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

    console.log(`data.ts fetchHosted ${url} status code:`, response.status);

    const data = await response.json();
    // console.log("data from hosted experience(schedules)", data);
    return data as Experience[];
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the hosted experience(schedules).");
  }
}

export async function fetchReviews(userId: number) {
  try {
    // console.log("token:", token);
    const url = apiUrl + `/review/user/${userId}`;
    console.log("url:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Cookie: `token=${cookies().get("token")!.value}`,
      },
      next: { tags: ["reviews"] },
    });

    console.log(`data.ts fetchReviews ${url} status code:`, response.status);

    const data = await response.json();
    // console.log("data from user review", data);
    return data as ReviewResponse;
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the user review.");
  }
}
