import { PlayerService } from "./player";
import {PlayerAverageService} from "./playerAverages";

const TeamService = {
  getRosterAverages: (roster: any[]) => {
    const playerWithAverages = roster.map((player) => {
      const playerData: any = {
        ...player,
      };
      delete playerData.GamePlayer;

      if (player.GamePlayer) {
        const { totals, gameCount } = PlayerService.getTotals(
          player.GamePlayer
        );
        const averages = PlayerAverageService.getAverages(totals, gameCount);
        playerData.averages = averages;
      }

      return playerData;
    });

    return playerWithAverages;
  },
};

export { TeamService };
