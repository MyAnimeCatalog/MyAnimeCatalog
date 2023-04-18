import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


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
        //Then check if it exists in another collection, if it does we don't need to do anything.
        let checkAnimeCol = await ctx.prisma.toWatch.findFirst({
          where: {
            userId: ctx.session.user.id,
            animeId: anime.id
          }
        });
        console.log('check is,',checkAnimeCol);
        if (checkAnimeCol !== null){
          return;
        }
        checkAnimeCol = await ctx.prisma.watching.findFirst({
          where: {
            userId: ctx.session.user.id,
            animeId: anime.id
          }
        });
        if (checkAnimeCol !== null){
          return;
        }
        checkAnimeCol = await ctx.prisma.watched.findFirst({
          where: {
            userId: ctx.session.user.id,
            animeId: anime.id
          }
        });
        if (checkAnimeCol !== null){
          return;
        }
      }
      
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

  updateCategory: protectedProcedure
    .input(z.object({
      collectionType: z.string(),
      newCollectionType: z.string(),
      id: z.string(),
      userId: z.string(),
      animeId: z.string()
    }))
    .mutation( async ({ ctx, input }) => {
      if (input.collectionType === 'toWatch'){
        await ctx.prisma.toWatch.delete({
          where: {
            id: input.id
          }
        });
      }

      else if (input.collectionType === 'watching'){
        await ctx.prisma.watching.delete({
          where: {
            id: input.id
          }
        });
      }

      else if (input.collectionType === 'watched'){
        await ctx.prisma.watched.delete({
          where: {
            id: input.id
          }
        });  
      }
      //Logic for creating the element in the new collection
      if (input.newCollectionType === 'toWatch'){
        return await ctx.prisma.toWatch.create({
          data: {
            userId: input.userId,
            animeId: input.animeId
            
          }
        });
      }

      else if (input.newCollectionType === 'watching'){
        return await ctx.prisma.watching.create({
          data: {
            userId: input.userId,
            animeId: input.animeId
          }
        });
      }

      else if (input.newCollectionType === 'watched'){
        return await ctx.prisma.watched.create({
          data: {
            userId: input.userId,
            animeId: input.animeId
          }
        });  
      }
    }),

  //Method to delete from list
  deleteFromList: protectedProcedure
    .input(z.object({
      collectionType: z.string(),
      id: z.string()
    }))
    .mutation( async ({ ctx, input }) => {
      if (input.collectionType === 'toWatch'){
        return await ctx.prisma.toWatch.delete({
          where: {
            id: input.id
          }
        });
      }

      else if (input.collectionType === 'watching'){
        return await ctx.prisma.watching.delete({
          where: {
            id: input.id
          }
        });
      }

      else if (input.collectionType === 'watched'){
        return await ctx.prisma.watched.delete({
          where: {
            id: input.id
          }
        });      
      }
    })
});
