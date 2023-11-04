import { PlayerQuery } from "../db/player";
import { PlayerService } from "./player";
import { PlayerStatTotal } from "@prisma/client";
import { PlayerTotalMutation } from "../db/playerTotals";

const PlayerTotalService = {
  initiateAll: async () => {
    const timestamp = new Date();

    const players = await PlayerQuery.findAll({ includeGames: true });

    const playerTotals = players.map((p) => {
      const { GamePlayer: games } = p;
      const { totals } = PlayerService.getTotals(games);
      const newTotals: PlayerStatTotal = {
        ...totals,
        latest_update: timestamp,
      };

      return newTotals;
    });

    const successfulCreation = await PlayerTotalMutation.createMany(
      playerTotals
    );

    if (successfulCreation) {
      await PlayerTotalMutation.markUpdate(timestamp);
    }

    return successfulCreation;
  },
};

export { PlayerTotalService };
