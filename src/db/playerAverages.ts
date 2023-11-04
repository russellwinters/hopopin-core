import { PlayerStatAverage } from "@prisma/client";
import { prisma } from "src/prisma";

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
};

export { PlayerAverageQuery, PlayerAverageMutation };
