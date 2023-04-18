import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


// interface animetype {
//   id: string,
//   titleEn: string
//   titleJP: string
//   image: string
//   malID: string
//   synposis: string
//   rating: string
//   genre: string
//   score: number
//   scored_by: number
//   rank: number
// }

// const t = initTRPC.context<ctx>().create();

// // First middleware -> adds anime to anime table
// // Second middleware -> use the anime id and add that to toWatch for the user

// const addAnime = t.middleware(async ({ctx, next}) => {
//   await ctx.prisma.anime.create({
//     data:{
      
//     }
//   })
// })

export const animeRouter = createTRPCRouter({
  addAnimeToWatch: publicProcedure
    .input(z.object({
      titleEn: z.string(),
      titleJP: z.string(),
      image: z.string(),
      malID: z.string(),
      synopsis: z.string(),
      rating: z.string(),
      genre: z.string(),
      score: z.number(),
      scored_by: z.number(),
      rank: z.number(),
    }))
    .mutation(async ({input, ctx}) => {
      const anime = await ctx.prisma.anime.create(
        {data: {
          titleEn: input.titleEn,
          titleJP: input.titleJP,
          image: input.image,
          malID: input.malID,
          synopsis: input.synopsis,
          rating: input.rating,
          genre: input.genre,
          score: input.score,
          scored_by: input.scored_by,
          rank: input.rank,
        }});
      if (ctx.session){
        const collection = await ctx.prisma.toWatch.create({
          data: {
            userId: ctx.session.user.id,
            animeId: anime.id
          }
        });
        return collection;
      }
      else return anime;
    }),

  getToWatch: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  getWatching: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getWatched: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  updateCategory: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
