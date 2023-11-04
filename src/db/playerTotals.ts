import { PlayerStatTotal } from "@prisma/client";
import { prisma } from "src/prisma";

const PlayerTotalQuery = {
  findById: async (id: string) => {
    const totals = await prisma.playerStatTotal.findUnique({
      where: {
        player_id: id,
      },
    });
    return totals;
  },
};

const PlayerTotalMutation = {
  upsertById: async (id: string, totals: PlayerStatTotal) => {
    try {
      const upsertTotals = await prisma.playerStatTotal.upsert({
        create: totals,
        update: totals,
        where: {
          player_id: id,
        },
      });

      console.log("successful total upsert for player_id: ", id);
      return upsertTotals;
    } catch (e) {
      console.log("error upserting totals: ", {});
      return false;
    }
  },
};

export { PlayerTotalQuery, PlayerTotalMutation };
