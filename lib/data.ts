const apiUrl = process.env.API_URL;

export async function fetchExperience(id: string) {
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }
  try {
    console.log(apiUrl + `/api/experience/${id}`);
    const response = await fetch(apiUrl + `/api/experience/${id}`);
    const data = response.json();
    return data;
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the experience.");
  }
}
