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
  findAll: async () => {
    const totals = await prisma.playerStatTotal.findMany();
    return totals;
  },
  findLastUpdate: async () => {
    const update = await prisma.playerTotalUpdate.findFirst({
      orderBy: {
        timestamp: "desc",
      },
    });
    return update;
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
  resetTotals: async () => {
    try {
      await prisma.playerStatTotal.deleteMany();
      await prisma.playerStatTotal.deleteMany();

      return true;
    } catch (e) {
      return false;
    }
  },
  updateMany: async (data: PlayerStatTotal[]) => {
    try {
      await prisma.playerStatTotal.updateMany({
        data,
      });

      return true;
    } catch (e) {
      return false;
    }
  },
};

export { PlayerTotalQuery, PlayerTotalMutation };
