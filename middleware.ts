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
  ignoredRoutes: ["/webhook", "/api/gemini"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
