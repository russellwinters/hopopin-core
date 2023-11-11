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
      const { totals, gameCount } = PlayerService.getTotals(games, timestamp);
      const averages = PlayerService.getAverages(totals, gameCount, timestamp);
      const newAverages: PlayerStatAverage = {
        ...averages,
      };

      return newAverages;
    });

    console.log({ playerAverages: playerAverages.slice(0, 5) });

    const successfulCreation = await PlayerAverageMutation.createMany(
      playerAverages
    );

    if (successfulCreation) {
      await PlayerAverageMutation.markUpdate(timestamp);
    }

    return successfulCreation;
  },
  resetAll: async () => {
    try {
      const hasResetSuccessfully = await PlayerAverageMutation.resetAverages();
      return hasResetSuccessfully;
    } catch (e) {
      return false;
    }
  },
};

export { PlayerAverageService };
