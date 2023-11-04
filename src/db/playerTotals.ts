import { PlayerStatTotal } from "@prisma/client";
import { prisma } from "../prisma";

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
  createMany: async (data: PlayerStatTotal[]) => {
    console.log({ data });
    try {
      await prisma.playerStatTotal.createMany({
        data,
      });
      console.log("successful creation of totals");
      return true;
    } catch (e) {
      console.log("error creating totals: ", { e });
      return false;
    }
  },
  markUpdate: async (time?: Date) => {
    const timestamp = time || new Date();
    const init = await prisma.playerTotalUpdate.create({
      data: {
        timestamp,
      },
    });

    return !!init;
  },
};

export { PlayerTotalQuery, PlayerTotalMutation };
