import { PlayerService } from "./player";

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
        const averages = PlayerService.getAverages(totals, gameCount);
        playerData.averages = averages;
      }

      return playerData;
    });

    return playerWithAverages;
  },
};

export { TeamService };
