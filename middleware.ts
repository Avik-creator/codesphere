// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/api/webhook",
//   "question/:id",
//   "/tags",
//   "/tags/:id",
//   "/profile/:id",
//   "/users",
//   "/jobs",
// ]);
// const isIgnoredRoute = createRouteMatcher(["/api/webhook", "/api/chatgtp"]);

// export default clerkMiddleware((auth, request) => {
//   if (!isPublicRoute(request) && !isIgnoredRoute(request)) {
//     auth().protect();
//   }
// });

import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "question/:id",
    "/tags",
    "/tags/:id",
    "/profile/:id",
    "/users",
    "/jobs",
  ],
  ignoredRoutes: ["/api/webhook", "/api/chatgtp"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
