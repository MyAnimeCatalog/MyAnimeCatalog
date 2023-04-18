import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getInfo: protectedProcedure
    .query(async ( { ctx }) => {
      const userData = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id
        }
      });
      return userData;
    }),

  updatePicture: protectedProcedure
    .input(z.object({ image: z.string()}))
    .query(async ({ ctx, input}) => {
      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          image: input.image,
        }
      });
      return updatedUser;
    }),

  updateBio: protectedProcedure
    .input(z.object({ bio: z.string()}))
    .query(async ({ ctx, input }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          bio: input.bio,
        }
      });
      return updatedUser;
    }),
});
