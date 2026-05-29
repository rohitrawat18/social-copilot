import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/clerk(.*)"
]);

export default clerkMiddleware(async (auth, request) => {
  const url = new URL(request.url);
  
  // Normalize spelling variations to standard sign-in / sign-up routes
  if (url.pathname === "/signin" || url.pathname === "/singin") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if (url.pathname === "/signup" || url.pathname === "/singup") {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.[\\w]+$).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
