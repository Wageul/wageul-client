const apiUrl = process.env.API_URL;

export async function GET() {
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }
  try {
    const url = apiUrl + "/user";
    console.log(url);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    const data = await res.json()
   
    return Response.json({ data })
  } catch (err) {
    console.error("Server Error:", err);
    throw new Error("Failed to fetch the experience.");
  }
}