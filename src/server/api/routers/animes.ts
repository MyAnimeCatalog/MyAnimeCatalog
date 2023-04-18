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
  //Add anime to one of the three collections for a user
  addAnimeToCollection: protectedProcedure
  //Define shape of input object
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
      collectionType: z.string() //collection type is used to decide which collection to add to
    }))
    .mutation(async ({input, ctx}) => {
      //Check if the input anime exists already
      let anime = await ctx.prisma.anime.findUnique({
        where: {
          titleEn: input.titleEn
        }
      });
      if (anime === null){
        //if it does not exist, create a row in the table
        anime = await ctx.prisma.anime.create(
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
      }
      else{
        //if it does exist, update it (anime data can change over time)
        anime = await ctx.prisma.anime.update(
          {
            where: {
              id: anime.id
            },
            data: {
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
            }
          }
        );
      }
      //Make sure user is logged in
      console.log(anime);
      if (input.collectionType === 'toWatch'){
        return await ctx.prisma.toWatch.create({
          data: {
            userId: ctx.session.user.id,
            animeId: anime.id
          }
        });
      }
      else if (input.collectionType === 'watching'){
        return await ctx.prisma.toWatch.create({
          data: {
            userId: ctx.session.user.id,
            animeId: anime.id
          }
        });
      }
      else if (input.collectionType === 'watched'){
        return await ctx.prisma.watched.create({
          data: {
            userId: ctx.session.user.id,
            animeId: anime.id
          }
        });
      }
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
