import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getInfo: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ( { ctx, input }) => {
      const userData = await ctx.prisma.user.findUnique({
        where: {
          id: input.id
        }
      });
      return userData;
    }),

  updatePicture: publicProcedure
    .input(z.object({id: z.string(), image: z.string()}))
    .query(async ({ ctx, input }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          image: input.image,
        }
      });
      return updatedUser;
    }),

  updateBio: publicProcedure
    .input(z.object({id: z.string(), bio: z.string()}))
    .query(async ({ ctx, input }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          bio: input.bio,
        }
      });
      return updatedUser;
    }),
});
