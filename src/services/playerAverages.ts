import { PlayerQuery } from "../db/player";
import { PlayerService } from "./player";
import { PlayerStatAverage } from "@prisma/client";
import { PlayerAverageMutation } from "../db/playerAverages";

const PlayerAverageService = {
  initiateAll: async () => {
    const timestamp = new Date();

    const players = await PlayerQuery.findAll({ includeGames: true });

    const playerAverages = players.map((p, i) => {
      const { GamePlayer: games } = p;
      const { totals, gameCount } = PlayerService.getTotals(games);
      const averages = PlayerService.getAverages(totals, gameCount);
      if (i < 4) console.log({ averages });
      const newAverages: PlayerStatAverage = {
        ...averages,
        latest_update: timestamp,
      };

      return newAverages;
    });

    const successfulCreation = await PlayerAverageMutation.createMany(
      playerAverages
    );

    if (successfulCreation) {
      await PlayerAverageMutation.markUpdate(timestamp);
    }

    return successfulCreation;
  },
};

export { PlayerAverageService };
