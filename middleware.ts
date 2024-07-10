import { NextResponse, NextRequest } from "next/server";
import { authenticateUserAndGetData } from "./lib/data";

export async function middleware(request: NextRequest) {
  const { loggedIn, data } = await authenticateUserAndGetData();

  // If the user is authenticated, continue as normal
  if (!loggedIn) {
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL("/bookmark", request.url));
}

export const config = {
  matcher: "/",
};
