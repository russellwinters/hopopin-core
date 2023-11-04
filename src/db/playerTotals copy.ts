import { PlayerStatAverage } from "@prisma/client";
import { prisma } from "src/prisma";

const PlayerAverageQuery = {
  findById: async (id: string) => {
    const average = await prisma.playerStatAverage.findUnique({
      where: {
        player_id: id,
      },
    });
    return average;
  },
};

const PlayerAverageMutation = {
  upsertById: async (id: string, average: PlayerStatAverage) => {
    try {
      const upsertAverages = await prisma.playerStatAverage.upsert({
        create: average,
        update: average,
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
};

export { PlayerAverageQuery, PlayerAverageMutation };
