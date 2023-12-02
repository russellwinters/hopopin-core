import {PlayerTotalMutation, PlayerTotalQuery} from "../db/playerTotals";
import {GamePlayer, PlayerStatTotal} from "@prisma/client";

const PlayerTotalService = {
  getPlayerTotals: async (id: string) => {
    return await PlayerTotalQuery.findById(id);
  },
  updatePlayerTotals: async (data: PlayerStatTotal) => {
    const {player_id} = data;
    return await PlayerTotalMutation.upsertById(player_id, {
      ...data
    })
  },
  addGameToPlayerTotals: async (game: GamePlayer) => {
    const {player_id} = game;
    const totals = await PlayerTotalService.getPlayerTotals(player_id);

    if (!totals) return false;
    const update = {
      ...totals,
    }
    update.minutes += game.minutes;
    update.fga += game.fga;
    update.fgm += game.fgm;
    update.minutes += game.tpa;
    update.minutes += game.tpm;
    update.minutes += game.fta;
    update.minutes += game.ftm;
    update.minutes += game.oreb;
    update.minutes += game.dreb;
    update.minutes += game.reb;
    update.minutes += game.ast;
    update.minutes += game.stl;
    update.minutes += game.blk;
    update.minutes += game.to;
    update.minutes += game.pf;
    update.minutes += game.pts;
    update.games_played += 1;

    await PlayerTotalService.updatePlayerTotals(update)
  },


};

export { PlayerTotalService };
