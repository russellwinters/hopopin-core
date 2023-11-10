import { PlayerStatAverage } from "@prisma/client";
import { prisma } from "../prisma";

const PlayerAverageQuery = {
  findById: async (id: string) => {
    const averages = await prisma.playerStatAverage.findUnique({
      where: {
        player_id: id,
      },
    });
    return averages;
  },
};

const PlayerAverageMutation = {
  upsertById: async (id: string, averages: PlayerStatAverage) => {
    try {
      const upsertAverages = await prisma.playerStatAverage.upsert({
        create: averages,
        update: averages,
        where: {
          player_id: id,
        },
      });

      console.log("successful average upsert for player_id: ", id);
      return upsertAverages;
    } catch (e) {
      console.log("error upserting averages: ", {});
      return false;
    }
  },
  createMany: async (data: PlayerStatAverage[]) => {
    try {
      await prisma.playerStatAverage.createMany({
        data,
      });

      return true;
    } catch (e) {
      return false;
    }
  },
  markUpdate: async (time?: Date) => {
    const timestamp = time || new Date();
    const init = await prisma.playerAverageUpdate.create({
      data: {
        timestamp,
      },
    });

    return !!init;
  },
  resetAverages: async () => {
    try {
      await prisma.playerStatAverage.deleteMany();
      await prisma.playerAverageUpdate.deleteMany();

      return true;
    } catch (e) {
      return false;
    }
  },
};

export { PlayerAverageQuery, PlayerAverageMutation };
