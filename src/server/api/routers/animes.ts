import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const animeRouter = createTRPCRouter({
  //Add anime to one of the three collections for a user
  addAnimeToCollection: protectedProcedure
    //Define shape of input object
    .input(
      z.object({
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
        collectionType: z.string(), //collection type is used to decide which collection to add to
      })
    )
    .mutation(async ({ input, ctx }) => {
      //Check if the input anime exists already
      let anime = await ctx.prisma.anime.findUnique({
        where: {
          titleEn: input.titleEn,
        },
      });
      if (anime === null) {
        //if it does not exist, create a row in the table
        anime = await ctx.prisma.anime.create({
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
          },
        });
      } else {
        //if it does exist, update it (anime data can change over time)
        anime = await ctx.prisma.anime.update({
          where: {
            id: anime.id,
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
          },
        });
        //Then check if it exists in another collection, if it does we don't need to do anything.
        let checkAnimeCol = await ctx.prisma.toWatch.findFirst({
          where: {
            userId: ctx.session.user.id,
            animeId: anime.id,
          },
        });
        if (checkAnimeCol !== null) {
          return;
        }
        checkAnimeCol = await ctx.prisma.watching.findFirst({
          where: {
            userId: ctx.session.user.id,
            animeId: anime.id,
          },
        });
        if (checkAnimeCol !== null) {
          return;
        }
        checkAnimeCol = await ctx.prisma.watched.findFirst({
          where: {
            userId: ctx.session.user.id,
            animeId: anime.id,
          },
        });
        if (checkAnimeCol !== null) {
          return;
        }
      }
      //Checking the collection type and adding to the correct one
      if (input.collectionType === "toWatch") {
        return await ctx.prisma.toWatch.create({
          data: {
            userId: ctx.session.user.id,
            animeId: anime.id,
          },
        });
      } else if (input.collectionType === "watching") {
        return await ctx.prisma.watching.create({
          data: {
            userId: ctx.session.user.id,
            animeId: anime.id,
          },
        });
      } else if (input.collectionType === "watched") {
        return await ctx.prisma.watched.create({
          data: {
            userId: ctx.session.user.id,
            animeId: anime.id,
          },
        });
      }
    }),

  getList: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      let list: { animeId: string }[];
      if (input === "toWatch") {
        list = await ctx.prisma.toWatch.findMany({
          where: {
            userId: ctx.session.user.id,
          },
          select: {
            animeId: true,
            id: true,
          },
        });
      } else if (input === "watching") {
        list = await ctx.prisma.watching.findMany({
          where: {
            userId: ctx.session.user.id,
          },
          select: {
            animeId: true,
            id: true,
          },
        });
      } else {
        list = await ctx.prisma.watched.findMany({
          where: {
            userId: ctx.session.user.id,
          },
          select: {
            animeId: true,
            id: true,
          },
        });
      }
      const animeIds: string[] = [];
      list.forEach((object) => {
        animeIds.push(object.animeId);
        //animeId -> anime table: id
      });
      return await ctx.prisma.anime.findMany({
        where: {
          id: { in: animeIds },
        },
      });
    }),

  updateCategory: protectedProcedure
    .input(
      z.object({
        collectionType: z.string(),
        newCollectionType: z.string(),
        animeId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.collectionType === "toWatch") {
        const animeToDelete = await ctx.prisma.toWatch.findFirst({
          where: {
            userId: ctx.session.user.id,
            animeId: input.animeId,
          },
        });

        await ctx.prisma.toWatch.delete({
          where: {
            id: animeToDelete!.id,
          },
        });
      } else if (input.collectionType === "watching") {
        const animeToDelete = await ctx.prisma.watching.findFirst({
          where: {
            userId: ctx.session.user.id,
            animeId: input.animeId,
          },
        });
        await ctx.prisma.watching.delete({
          where: {
            id: animeToDelete!.id,
          },
        });
      } else if (input.collectionType === "watched") {
        const animeToDelete = await ctx.prisma.watched.findFirst({
          where: {
            userId: ctx.session.user.id,
            animeId: input.animeId,
          },
        });

        await ctx.prisma.watched.delete({
          where: {
            id: animeToDelete!.id,
          },
        });
      }
      //Logic for creating the element in the new collection
      if (input.newCollectionType === "toWatch") {
        const updated = await ctx.prisma.toWatch.create({
          data: {
            userId: ctx.session.user.id,
            animeId: input.animeId,
          },
        });
        const updatedAnime = await ctx.prisma.anime.findUnique({
          where: {
            id: updated.animeId
          }
        });
        return updatedAnime;
      } else if (input.newCollectionType === "watching") {
        const updated = await ctx.prisma.watching.create({
          data: {
            userId: ctx.session.user.id,
            animeId: input.animeId,
          },
        });
        const updatedAnime = await ctx.prisma.anime.findUnique({
          where: {
            id: updated.animeId
          }
        });
        return updatedAnime;
      } else if (input.newCollectionType === "watched") {
        const updated = await ctx.prisma.watched.create({
          data: {
            userId: ctx.session.user.id,
            animeId: input.animeId,
          },
        });
        const updatedAnime = await ctx.prisma.anime.findUnique({
          where: {
            id: updated.animeId
          }
        });
        return updatedAnime;
      }
    }),

  //Method to delete from list
  deleteFromList: protectedProcedure
    .input(
      z.object({
        collectionType: z.string(),
        animeId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.collectionType === "toWatch") {
        const animeToDelete = await ctx.prisma.toWatch.findFirst({
          where: {
            userId: ctx.session.user.id,
            animeId: input.animeId,
          },
        });

        return await ctx.prisma.toWatch.delete({
          where: {
            id: animeToDelete!.id,
          },
        });
      } else if (input.collectionType === "watching") {
        const animeToDelete = await ctx.prisma.watching.findFirst({
          where: {
            userId: ctx.session.user.id,
            animeId: input.animeId,
          },
        });

        return await ctx.prisma.watching.delete({
          where: {
            id: animeToDelete!.id,
          },
        });
      } else if (input.collectionType === "watched") {
        const animeToDelete = await ctx.prisma.watched.findFirst({
          where: {
            userId: ctx.session.user.id,
            animeId: input.animeId,
          },
        });

        return await ctx.prisma.watched.delete({
          where: {
            id: animeToDelete!.id,
          },
        });
      }
    }),
});
