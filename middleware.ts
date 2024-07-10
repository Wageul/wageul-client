import { NextResponse, NextRequest } from "next/server";
import { authenticateUserAndGetData } from "./lib/data";

export async function middleware(request: NextRequest) {
  const { loggedIn, data } = await authenticateUserAndGetData();

  // for /user/:id
  // redirect user page to myProfile if the userId matches the current user
  const match = request.nextUrl.pathname.match(/^\/user\/([^\/]+)$/);
  if (match) {
    console.log("pathname", request.nextUrl.pathname);
    const userId = match[1];
    console.log("userId", userId);
    if (loggedIn && String(data!.id) === userId) {
      return NextResponse.redirect(new URL("/user/myprofile", request.url));
    }
    return NextResponse.next();
  }

  // for /
  // If the user is authenticated, continue as normal
  if (request.nextUrl.pathname === "/") {
    if (!loggedIn) {
      return NextResponse.next();
    }

    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL("/experience", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/user/:id*"],
};
