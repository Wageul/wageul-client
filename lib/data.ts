const apiUrl = process.env.API_URL;

export async function fetchExperience(id: string) {
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  try {
    console.log(apiUrl + `/api/experience/${id}`);
    const response = await fetch(apiUrl + `/api/experience/${id}`);
    console.log('here', response);
    const contentType = response.headers.get('content-type');
    console.log('content type', contentType);
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    // return data;
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the experience.");
  }
}
