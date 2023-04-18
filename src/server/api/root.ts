import { createTRPCRouter } from "~/server/api/trpc";
import { animeRouter } from "~/server/api/routers/animes";
import { usersRouter } from "~/server/api/routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  animes: animeRouter,
  users: usersRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
